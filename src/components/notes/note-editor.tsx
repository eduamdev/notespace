import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { useDebouncedCallback } from "use-debounce";
import { useNotes } from "@/hooks/use-notes";
import EditorToolbar from "@/components/notes/editor-toolbar";
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import { Note } from "@/models/note";

interface NoteEditorProps {
  note?: Note;
}

const NoteEditor = ({ note }: NoteEditorProps) => {
  const { createItem, updateItem } = useNotes();
  const [title, setTitle] = useState(note?.title ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, navigate] = useLocation();

  const { noteId } = useParams<{ noteId: string }>();

  const debouncedAutosave = useDebouncedCallback(() => {
    try {
      autosaveNote();
      setError(null);
    } catch (error) {
      setError("An error occurred while saving the note.");
    } finally {
      setIsSaving(false);
    }
  }, 1000);

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
    onUpdate: () => {
      setIsSaving(true);
      debouncedAutosave();
    },
  });

  const autosaveNote = () => {
    if (note) {
      updateItem({
        ...note,
        title,
        contentHTML: editor?.getHTML() ?? "",
        contentText: editor?.getText() ?? "",
        updatedAt: new Date(),
      });
    } else if (noteId) {
      createItem({
        id: noteId,
        title,
        contentHTML: editor?.getHTML() ?? "",
        contentText: editor?.getText() ?? "",
        tags: [],
        isFavorite: false,
        notebookId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      navigate(`/notes/${noteId}/edit`);
    }
  };

  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note.contentHTML);
      setTitle(note.title);
    }
  }, [editor, note]);

  return (
    <div className="grid size-full grid-cols-1 grid-rows-[72px_90px_1fr]">
      <div className="px-4 py-5 lg:px-6">
        <label htmlFor="noteTitleInput" className="sr-only">
          Note title:
        </label>
        <input
          type="text"
          id="noteTitleInput"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIsSaving(true);
            debouncedAutosave();
          }}
          placeholder="Note title"
          className="w-full truncate rounded-md  text-2xl font-semibold text-black outline-none placeholder:font-medium"
        />
      </div>
      <div className="overflow-hidden px-4 lg:-mx-7 lg:px-6">
        <EditorToolbar editor={editor} />
      </div>
      <div className="overflow-y-auto px-4 lg:px-6">
        <div className="py-4">
          <EditorContent
            editor={editor}
            className="focus-visible:[&>.tiptap]:outline-none"
          />
        </div>
        {isSaving && (
          <div className="my-4 text-sm text-neutral-500">Saving...</div>
        )}
        {error && <div className="my-4 text-sm text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default NoteEditor;
