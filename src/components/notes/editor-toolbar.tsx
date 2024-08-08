import { ComponentType, SVGProps } from "react";
import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { HeadingIcon } from "@/components/icons/heading-icon";
import { BoldIcon } from "@/components/icons/bold-icon";
import { ItalicIcon } from "@/components/icons/italic-icon";
import { StrikethroughIcon } from "@/components/icons/strikethrough-icon";
import { UnorderedListIcon } from "@/components/icons/unordered-list-icon";
import { OrderedListIcon } from "@/components/icons/ordered-list-icon";
import { CodeIcon } from "@/components/icons/code-icon";

interface ToolbarButtonProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

const ToolbarButton = ({
  icon: Icon,
  label,
  onClick,
  isActive,
  isDisabled,
}: ToolbarButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span>
        <Toggle
          aria-label={`Toggle ${label}`}
          pressed={isActive}
          onPressedChange={onClick}
          disabled={isDisabled}
        >
          <Icon className="size-5 shrink-0" />
        </Toggle>
      </span>
    </TooltipTrigger>
    <TooltipContent collisionPadding={{ top: 20, bottom: 20, left: 20 }}>
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

function EditorToolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="mx-auto inline-flex items-center justify-center gap-x-2">
      <ToolbarButton
        icon={HeadingIcon}
        label="Heading"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
      />
      <ToolbarButton
        icon={BoldIcon}
        label="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        isDisabled={!editor.can().chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        icon={ItalicIcon}
        label="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        isDisabled={!editor.can().chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        icon={StrikethroughIcon}
        label="Strike Through"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        isDisabled={!editor.can().chain().focus().toggleStrike().run()}
      />

      <Separator orientation="vertical" className="mx-4 h-5" />

      <ToolbarButton
        icon={UnorderedListIcon}
        label="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      />
      <ToolbarButton
        icon={OrderedListIcon}
        label="Ordered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      />
      <ToolbarButton
        icon={CodeIcon}
        label="Code Block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
      />
    </div>
  );
}

export default EditorToolbar;
