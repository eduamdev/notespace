import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import { EditorProvider, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "@/components/editor/toolbar";

interface TiptapProps {
  placeholder: string;
  content: string;
  onChange: (richText: string) => void;
}

function Tiptap({ placeholder, content, onChange }: TiptapProps) {
  const extensions = [
    StarterKit.configure({
      paragraph: {
        HTMLAttributes: {
          class: "leading-8",
        },
      },
    }),
    Placeholder.configure({
      placeholder: placeholder,
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
  ];

  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<EditorToolbar />}
      editorProps={{
        attributes: {
          class: "focus-visible:outline-none",
        },
      }}
      onUpdate={({ editor }) => {
        onChange(editor.getHTML());
        console.log(editor.getHTML());
      }}
    >
      <></>
    </EditorProvider>
  );
}

export default Tiptap;
