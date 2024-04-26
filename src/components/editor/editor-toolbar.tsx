import { useCurrentEditor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";

import { Heading2Icon } from "@/components/icons/heading2-icon";
import { Heading3Icon } from "@/components/icons/heading3-icon";
import { BoldIcon } from "@/components/icons/bold-icon";
import { ItalicIcon } from "@/components/icons/italic-icon";
import { StrikethroughIcon } from "@/components/icons/strikethrough-icon";
import { ListIcon } from "@/components/icons/list-icon";
import { ListNumbersIcon } from "@/components/icons/list-numbers";
import { CodeIcon } from "@/components/icons/code-icon";
import { SeparatorHorizontalIcon } from "@/components/icons/separator-horizontal-icon";
import { UndoIcon } from "@/components/icons/undo-icon";
import { RedoIcon } from "@/components/icons/redo-icon";

function EditorToolbar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 border-y py-6">
      {/* H-2 */}
      <Toggle
        aria-label="Toggle heading level 2"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2Icon className="size-5 shrink-0" />
      </Toggle>

      {/* H-3 */}
      <Toggle
        aria-label="Toggle heading level 3"
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3Icon className="size-5 shrink-0" />
      </Toggle>

      {/* Bold */}
      <Toggle
        aria-label="Toggle bold"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <BoldIcon className="size-5 shrink-0" />
      </Toggle>

      {/* Italic */}
      <Toggle
        aria-label="Toggle italic"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="size-5 shrink-0" />
      </Toggle>

      {/* Strike through */}
      <Toggle
        aria-label="Toggle strike through"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon className="size-5 shrink-0" />
      </Toggle>

      {/* Bullet list */}
      <Toggle
        aria-label="Toggle bullet list"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon className="size-5 shrink-0" />
      </Toggle>

      {/* Ordered list */}
      <Toggle
        aria-label="Toggle ordered list"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListNumbersIcon className="size-5 shrink-0" />
      </Toggle>

      {/* Code block */}
      <Toggle
        aria-label="Toggle code block"
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <CodeIcon className="size-5 shrink-0" />
      </Toggle>

      {/* Horizontal rule */}
      <Toggle
        aria-label="Toggle horizontal rule"
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <SeparatorHorizontalIcon className="size-5 shrink-0" />
      </Toggle>

      {/* Undo */}
      <Toggle
        aria-label="Toggle undo action"
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <UndoIcon className="size-5 shrink-0" />
      </Toggle>

      {/* Redo */}
      <Toggle
        aria-label="Toggle redo action"
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <RedoIcon className="size-5 shrink-0" />
      </Toggle>
    </div>
  );
}

export default EditorToolbar;
