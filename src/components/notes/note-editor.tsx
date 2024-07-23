import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { useDebounce } from "use-debounce";
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
  const { addItem: addNote, updateItem: updateNote } = useNotes();
  const [title, setTitle] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [, navigate] = useLocation();

  const { noteId } = useParams<{ noteId: string }>();

  if (note) {
    console.log(
      `note provided: ${note.id}, ${note.title}, ${note.contentText}`
    );
  } else {
    console.log(`new note: ${noteId}`);
  }

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
    const fetchCurrentNote = () => {
      if (editor) {
        if (note) {
          setTitle(note.title);
          editor.commands.setContent(note.contentHTML);

          setInitialTitle(note.title);
          setInitialContent(note.contentHTML);
        } else {
          setTitle("");
          editor.commands.clearContent();

          setInitialTitle("");
          setInitialContent("");
        }
      }
    };

    fetchCurrentNote();
  }, [editor, note, noteId]);

  const [debouncedTitle, { isPending: isDebouncedTitlePending }] = useDebounce(
    title,
    2000
  );
  const [
    debouncedEditorContent,
    { isPending: isDebouncedEditorContentPending },
  ] = useDebounce(editor?.state.doc.content, 2000);

  // useEffect(() => {
  //   const autosaveNote = () => {
  //     if (
  //       debouncedEditorContent &&
  //       (debouncedTitle !== initialTitle ||
  //         editor?.getText() !== initialContent)
  //     ) {
  //       try {
  //         setError(null);
  //         if (note) {
  //           updateNote({
  //             ...note,
  //             title: title,
  //             contentHTML: editor?.getHTML() ?? "",
  //             contentText: editor?.getText() ?? "",
  //             updatedAt: new Date(),
  //           });
  //         } else if (
  //           debouncedTitle.trim() !== "" ||
  //           editor?.getText().trim() !== ""
  //         ) {
  //           if (noteId) {
  //             addNote({
  //               id: noteId,
  //               title: title,
  //               contentHTML: editor?.getHTML() ?? "",
  //               contentText: editor?.getText() ?? "",
  //               tags: [],
  //               isFavorite: false,
  //               notebookId: "",
  //               createdAt: new Date(),
  //               updatedAt: new Date(),
  //             });
  //             navigate(`/notes/${noteId}/edit`);
  //           }
  //         }
  //       } catch (error) {
  //         setError("An error occurred while saving the note.");
  //       }
  //     }
  //   };

  //   autosaveNote();
  // }, [
  //   debouncedTitle,
  //   updateNote,
  //   title,
  //   editor,
  //   addNote,
  //   navigate,
  //   initialTitle,
  //   initialContent,
  //   debouncedEditorContent,
  //   noteId,
  //   note,
  // ]);

  return (
    <div className="grid size-full grid-cols-1 grid-rows-[72px_90px_1fr]">
      <div className="px-4 py-5 lg:px-6">
        <input
          type="text"
          value={title}
          className="w-full truncate rounded-md  text-2xl font-semibold text-black outline-none placeholder:font-medium"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Note title"
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
        {(isDebouncedTitlePending() || isDebouncedEditorContentPending()) && (
          <div className="my-4 text-sm text-gray-500">
            {initialTitle === title && initialContent === editor?.getText()
              ? `Loading...`
              : `Saving...`}
          </div>
        )}
        {error && <div className="my-4 text-sm text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default NoteEditor;
