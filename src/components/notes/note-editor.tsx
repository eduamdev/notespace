import { useState } from "react";
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import EditorToolbar from "@/components/notes/editor-toolbar";
import { addItem } from "@/services/storage-service";
import { useEncryption } from "@/hooks/use-encryption";
import { Note } from "@/models/note";
import { toast } from "sonner";

const NoteEditor = ({
  onSave,
  placeholder,
}: {
  onSave: (newNote: Note) => void;
  placeholder?: string;
}) => {
  const { encrypt } = useEncryption();
  const [title, setTitle] = useState("");
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
        placeholder,
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

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editor?.getHTML()) {
        const encryptedNote = await encrypt(editor.getHTML());
        const encryptedNoteTitle = await encrypt(title);

        const newNote: Note = {
          id: Date.now().toString(),
          title: encryptedNoteTitle,
          content: encryptedNote,
          tags: [],
          notebookId: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        console.log(newNote);

        await addItem("notes", { ...newNote });
        onSave({
          ...newNote,
          title,
          content: editor.getHTML(),
        });
        setTitle("");
        editor.commands.clearContent();
        toast.success(`Notebook has been created`);
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
        className="rounded-md px-4 py-3 text-2xl font-semibold text-black outline-none placeholder:font-medium"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Note title"
      />
      <EditorToolbar editor={editor} />
      <div className="p-4">
        <EditorContent
          editor={editor}
          className="focus-visible:[&>.tiptap]:outline-none"
        />
      </div>
      <div className="mt-4 px-4">
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
