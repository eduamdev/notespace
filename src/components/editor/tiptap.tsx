import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "@/components/editor/toolbar";

interface TiptapProps {
  content: string;
  onChange: (richText: string) => void;
}

function Tiptap({ content, onChange }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      Placeholder.configure({
        placeholder: "Start writing something ...",
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "focus-visible:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}

export default Tiptap;
