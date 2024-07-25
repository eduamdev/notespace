import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ModalForm from "@/components/modal-form";
import { PlusIcon } from "@/components/icons/plus-icon";
import { generateUniqueId } from "@/lib/utils";
import { Tag } from "@/models/tag";

interface TagFormProps {
  createItem: (item: Tag) => void;
}

export default function TagForm({ createItem }: TagFormProps) {
  const [tagName, setTagName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (tagName.trim()) {
        createItem({
          id: generateUniqueId(),
          name: tagName,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Tag);

        setTagName("");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("Error creating tag");
      console.error("Error creating tag:", error);
    }
  };

  return (
    <ModalForm
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      title="Create Tag"
      description=""
      trigger={
        <button className="flex h-9 items-center justify-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50">
          <PlusIcon className="inline-block size-4" />
          <span className="pl-1.5 text-sm font-medium">Create Tag</span>
        </button>
      }
      onSubmit={handleSubmit}
    >
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
    </ModalForm>
  );
}
