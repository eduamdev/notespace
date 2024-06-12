import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import { useNotes } from "@/hooks/use-notes";
import { getItem } from "@/services/idb-service";
import EditorToolbar from "@/components/notes/editor-toolbar";
import { Note } from "@/models/note";
import { STORE_NAMES } from "@/lib/constants";

const NoteEditor = ({ noteId }: { noteId?: string }) => {
  const { addNote, updateNote } = useNotes();
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
      if (noteId) {
        const note = await getItem<Note>(STORE_NAMES.NOTES, noteId);
        if (note) {
          setCurrentNote(note);
          if (editor) {
            setTitle(note.title);
            editor.commands.setContent(note.content);
          }
        }
      }
    };

    void fetchNote();
  }, [editor, noteId]);

  const handleUpsertNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editor?.getHTML()) {
        if (currentNote) {
          updateNote({
            ...currentNote,
            title,
            content: editor.getHTML(),
          });

          toast.success(`Note has been updated`);
        } else {
          addNote({
            id: Date.now().toString(),
            title,
            content: editor.getHTML(),
            tags: [],
            notebookId: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          setTitle("");
          editor.commands.clearContent();
          toast.success(`Note has been created`);
        }
      }
    } catch (error) {
      console.error("Error creating or editing a note:", error);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        handleUpsertNote(event);
      }}
    >
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
