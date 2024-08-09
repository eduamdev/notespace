import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation, useParams } from "wouter";
import "@/styles/editor.css";
import { useDebouncedCallback } from "use-debounce";
import { useNotes } from "@/hooks/use-notes";
import EditorToolbar from "@/components/notes/editor-toolbar";
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import { LoaderIcon } from "../icons/loader-icon";
import { Note } from "@/models/note";

interface NoteEditorProps {
  note?: Note;
}

const NoteEditor = ({ note }: NoteEditorProps) => {
  const { createItem, updateItem } = useNotes();
  const [title, setTitle] = useState(note?.title ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [location, setLocation] = useLocation();

  const { noteId, notebookId, tagId } = useParams<{
    noteId: string;
    notebookId: string;
    tagId: string;
  }>();

  const debouncedAutosave = useDebouncedCallback(() => {
    try {
      autosaveNote();
    } catch (error) {
      toast.error("An error occurred while saving the note.");
      console.error("An error occurred while saving the note.");
    } finally {
      setIsSaving(false);
    }
  }, 1000);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
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
            2: "mt-8 text-[20px] font-semibold text-black",
            3: "mt-6 text-lg font-semibold text-black",
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
    } else {
      createItem({
        id: noteId,
        title,
        contentHTML: editor?.getHTML() ?? "",
        contentText: editor?.getText() ?? "",
        tags: tagId ? [tagId] : [],
        isFavorite: false,
        notebookId: notebookId || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setLocation(location.split("/").slice(0, -1).join("/") + "/edit");
    }
  };

  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note.contentHTML);
      setTitle(note.title);
    }
  }, [editor, note]);

  return (
    <div className="relative grid size-full grid-cols-1 grid-rows-[72px_90px_1fr]">
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

      <div className="relative border-y">
        <div className="grid grid-cols-1 items-center justify-center overflow-hidden px-4 py-6 lg:px-6">
          <EditorToolbar editor={editor} />
        </div>
        {isSaving && (
          <div className="pointer-events-none absolute -bottom-7 right-0 z-20 h-7">
            <div className="flex h-full items-center justify-start gap-x-2.5 border-y border-l bg-neutral-50 px-2.5">
              <LoaderIcon className="inline size-[14px] shrink-0 animate-spin text-neutral-900" />
              <span className="font-serif text-neutral-500">Saving...</span>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-y-auto px-4 lg:px-6">
        <div className="pb-16 pt-8">
          <EditorContent
            editor={editor}
            className="2xl:mx-auto 2xl:max-w-prose focus-visible:[&>.tiptap]:outline-none"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-white pb-5 pt-12">
        <div className="relative flex h-8 items-center justify-center px-4 lg:px-6"></div>
      </div>
    </div>
  );
};

export default NoteEditor;
