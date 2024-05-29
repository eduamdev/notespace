import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import { useAuth } from "@/hooks/use-auth";
import { useEncryption } from "@/hooks/use-encryption";
import { addItem, getItem, updateItem } from "@/services/database-service";
import EditorToolbar from "@/components/notes/editor-toolbar";
import { Note } from "@/models/note";
import { STORE_NAMES } from "@/lib/constants";

const NoteEditor = ({
  onSave,
  noteId,
}: {
  onSave: (newNote: Note) => void;
  noteId?: string;
}) => {
  const { user } = useAuth();
  const { encryptData, decryptData } = useEncryption();
  const [title, setTitle] = useState("");
  const [currentNote, setCurrentNote] = useState<Note>();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        paragraph: {
          HTMLAttributes: {
            class: "leading-8",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing something ...",
      }),
      Heading.extend({
        levels: [2, 3],
        renderHTML({ node, HTMLAttributes }) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: Record<number, string> = {
            2: "text-[20px] font-semibold text-black",
            3: "text-lg font-semibold text-black",
          };
          return [
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              class: classes[level],
            }),
            0,
          ];
        },
      }).configure({ levels: [2, 3] }),
    ],
    content: "",
  });

  useEffect(() => {
    const fetchNote = async () => {
      if (user) {
        if (noteId) {
          const encryptedNote = await getItem<Note>(STORE_NAMES.NOTES, noteId);
          if (encryptedNote) {
            setCurrentNote(encryptedNote);
            const decryptedNote: Note = {
              ...encryptedNote,
              title: await decryptData(user.encryptionKey, encryptedNote.title),
              content: await decryptData(
                user.encryptionKey,
                encryptedNote.content
              ),
            };
            if (editor) {
              setTitle(decryptedNote.title);
              editor.commands.setContent(decryptedNote.content);
            }
          }
        }
      }
    };

    void fetchNote();
  }, [decryptData, editor, noteId, user]);

  const handleAddNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (user) {
        if (editor?.getHTML()) {
          const encryptedNote = await encryptData(
            user.encryptionKey,
            editor.getHTML()
          );
          const encryptedNoteTitle = await encryptData(
            user.encryptionKey,
            title
          );

          if (currentNote) {
            await updateItem(STORE_NAMES.NOTES, {
              ...currentNote,
              title: encryptedNoteTitle,
              content: encryptedNote,
            });
            onSave({
              ...currentNote,
              title,
              content: editor.getHTML(),
            });
            toast.success(`Note has been updated`);
          } else {
            const newNote: Note = {
              id: Date.now().toString(),
              title: encryptedNoteTitle,
              content: encryptedNote,
              tags: [],
              notebookId: "",
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            await addItem(STORE_NAMES.NOTES, { ...newNote });
            onSave({
              ...newNote,
              title,
              content: editor.getHTML(),
            });
            setTitle("");
            editor.commands.clearContent();
            toast.success(`Note has been created`);
          }
        }
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <form onSubmit={(event) => void handleAddNote(event)}>
      <input
        type="text"
        value={title}
        className="rounded-md px-6 py-5 text-2xl font-semibold text-black outline-none placeholder:font-medium"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Note title"
      />
      <EditorToolbar editor={editor} />
      <div className="px-6 py-4">
        <EditorContent
          editor={editor}
          className="focus-visible:[&>.tiptap]:outline-none"
        />
      </div>
      <div className="mt-4 px-6">
        <button
          type="submit"
          className="inline-flex rounded-lg bg-black p-3 font-medium text-white "
        >
          Create Note
        </button>
      </div>
    </form>
  );
};

export default NoteEditor;
