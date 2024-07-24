import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Tag } from "@/models/tag";
import { cn, generateUniqueId } from "@/lib/utils";

interface TagFormProps {
  createItem: (item: Tag) => void;
  onClose: () => void;
  isDrawer?: boolean;
}

export default function TagForm({
  createItem,
  onClose,
  isDrawer = false,
}: TagFormProps) {
  const [tagName, setTagName] = useState("");

  const handleFormSubmit = (e: FormEvent) => {
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
        onClose();
      }
    } catch (error) {
      toast.error("Error creating tag");
      console.error("Error creating tag:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={cn("pt-3", isDrawer && "px-4")}>
        <div className="flex flex-col">
          <label htmlFor="tagNameInput" className="sr-only">
            Tag Name:
          </label>
          <input
            type="text"
            id="tagNameInput"
            value={tagName}
            onChange={(e) => {
              setTagName(e.target.value);
            }}
            placeholder="Enter tag name"
            className="h-10 w-full rounded-md border border-black/[0.12] px-3 shadow-sm outline-none placeholder:text-sm"
          />
        </div>
      </div>
      <>
        {isDrawer ? (
          <DrawerFooter>
            <button
              type="submit"
              className="flex h-10 items-center justify-center rounded-lg border border-transparent bg-neutral-800 px-4 text-[15px] font-medium text-neutral-50"
            >
              Create Tag
            </button>
            <DrawerClose asChild>
              <button
                type="button"
                className="flex h-10 items-center justify-center rounded-lg border border-neutral-950/[0.12] bg-transparent px-4 text-[15px] text-neutral-700 shadow-sm"
              >
                Cancel
              </button>
            </DrawerClose>
          </DrawerFooter>
        ) : (
          <DialogFooter>
            <div className="flex items-center justify-end gap-x-3.5">
              <DialogClose asChild>
                <button
                  type="button"
                  className="flex h-9 items-center justify-center rounded-lg border border-neutral-950/[0.12] bg-transparent px-4 text-neutral-700 shadow-sm"
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="submit"
                className="flex h-9 items-center justify-center rounded-lg border border-transparent bg-neutral-800 px-4 font-medium text-neutral-50"
              >
                Create Tag
              </button>
            </div>
          </DialogFooter>
        )}
      </>
    </form>
  );
}
