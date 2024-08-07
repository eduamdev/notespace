import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { generateUniqueId } from "@/lib/utils";
import { useTags } from "@/hooks/use-tags";
import { Tag } from "@/models/tag";

interface TagFormProps {
  tag?: Tag;
  onSuccess?: () => void;
}

export default function TagForm({ tag, onSuccess }: TagFormProps) {
  const { createItem, updateItem } = useTags(tag ? tag.name : "");
  const [tagName, setTagName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (tagName.trim()) {
        if (tag) {
          updateItem({
            ...tag,
            name: tagName,
            updatedAt: new Date(),
          });
        } else {
          createItem({
            id: generateUniqueId(),
            name: tagName,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        setTagName("");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      toast.error(`Error ${tag ? "updating" : "saving"} tag`);
      console.error(`Error ${tag ? "updating" : "saving"} tag:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="tagNameInput" className="sr-only">
          Tag Name:
        </label>
        <input
          type="text"
          id="tagNameInput"
          value={tagName}
          placeholder="Enter tag name"
          className="h-10 w-full rounded-md border border-black/[0.12] px-3 shadow-sm outline-none placeholder:text-sm"
          onChange={(e) => {
            setTagName(e.target.value);
          }}
        />
      </div>
      <div className="mt-auto flex flex-col items-center gap-2 py-4 lg:flex-row lg:justify-end lg:pb-0">
        <Button type="submit" className="w-full lg:w-auto">
          {tag ? `Edit Tag` : `Create Tag`}
        </Button>
      </div>
    </form>
  );
}
