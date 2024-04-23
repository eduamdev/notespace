import { useCurrentEditor } from "@tiptap/react";

function EditorToolbar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 py-4">
      {/* H-2 */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "bg-neutral-200" : ""
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 12a2 2 0 1 1 4 0c0 .591 -.417 1.318 -.816 1.858l-3.184 4.143l4 0" />
          <path d="M4 6v12" />
          <path d="M12 6v12" />
          <path d="M11 18h2" />
          <path d="M3 18h2" />
          <path d="M4 12h8" />
          <path d="M3 6h2" />
          <path d="M11 6h2" />
        </svg>
      </button>

      {/* H-3 */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? "bg-neutral-200" : ""
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 14a2 2 0 1 0 -2 -2" />
          <path d="M17 16a2 2 0 1 0 2 -2" />
          <path d="M4 6v12" />
          <path d="M12 6v12" />
          <path d="M11 18h2" />
          <path d="M3 18h2" />
          <path d="M4 12h8" />
          <path d="M3 6h2" />
          <path d="M11 6h2" />
        </svg>
      </button>

      {/* Bold */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-neutral-200" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z" />
          <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
        </svg>
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-neutral-200" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M11 5l6 0" />
          <path d="M7 19l6 0" />
          <path d="M14 5l-4 14" />
        </svg>
      </button>

      {/* Strike through */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-neutral-200" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5" />
        </svg>
      </button>

      {/* Bullet list */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-neutral-200" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l11 0" />
          <path d="M9 12l11 0" />
          <path d="M9 18l11 0" />
          <path d="M5 6l0 .01" />
          <path d="M5 12l0 .01" />
          <path d="M5 18l0 .01" />
        </svg>
      </button>

      {/* Ordered list */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-neutral-200" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M11 6h9" />
          <path d="M11 12h9" />
          <path d="M12 18h8" />
          <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
          <path d="M6 10v-6l-2 2" />
        </svg>
      </button>

      {/* Code block */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-neutral-200" : ""}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 8l-4 4l4 4" />
          <path d="M17 8l4 4l-4 4" />
          <path d="M14 4l-4 16" />
        </svg>
      </button>

      {/* Horizontal rule */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 12l16 0" />
          <path d="M8 8l4 -4l4 4" />
          <path d="M16 16l-4 4l-4 -4" />
        </svg>
      </button>

      {/* Undo */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 14l-4 -4l4 -4" />
          <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
        </svg>
      </button>

      {/* Redo */}
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 14l4 -4l-4 -4" />
          <path d="M19 10h-11a4 4 0 1 0 0 8h1" />
        </svg>
      </button>
    </div>
  );
}

export default EditorToolbar;
