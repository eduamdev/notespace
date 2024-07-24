import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Notebook } from "@/models/notebook";
import { cn, generateUniqueId } from "@/lib/utils";

interface NotebookFormProps {
  createItem: (notebook: Notebook) => void;
  onClose: () => void;
  isDrawer?: boolean;
}

export default function NotebookForm({
  createItem,
  onClose,
  isDrawer = false,
}: NotebookFormProps) {
  const [notebookName, setNotebookName] = useState("");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (notebookName.trim()) {
        createItem({
          id: generateUniqueId(),
          name: notebookName,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Notebook);

        setNotebookName("");
        onClose();
      }
    } catch (error) {
      toast.error("Error creating notebook");
      console.error("Error creating notebook:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={cn("pt-3", isDrawer && "px-4")}>
        <div className="flex flex-col">
          <label htmlFor="notebookNameInput" className="sr-only">
            Notebook Name:
          </label>
          <input
            type="text"
            id="notebookNameInput"
            value={notebookName}
            onChange={(e) => {
              setNotebookName(e.target.value);
            }}
            placeholder="Enter notebook name"
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
              Create Notebook
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
                Create Notebook
              </button>
            </div>
          </DialogFooter>
        )}
      </>
    </form>
  );
}
