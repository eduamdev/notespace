import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Notebook } from "@/models/notebook";
import { cn, generateUniqueId } from "@/lib/utils";

interface NotebookFormProps {
  addItem: (notebook: Notebook) => void;
  onClose: () => void;
  isDrawer?: boolean;
}

export default function NotebookForm({
  addItem,
  onClose,
  isDrawer = false,
}: NotebookFormProps) {
  const [notebookName, setNotebookName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (notebookName.trim()) {
        addItem({
          id: generateUniqueId(),
          name: notebookName,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Notebook);

        setNotebookName("");
        onClose();
        toast.success("Notebook has been created");
      }
    } catch (error) {
      toast.error("Error creating notebook");
      console.error("Error creating notebook:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn("pt-3", isDrawer && "px-4")}>
        <div className="flex flex-col">
          <label htmlFor="txtNotebookName" className="sr-only">
            Notebook:
          </label>
          <input
            type="text"
            id="txtNotebookName"
            value={notebookName}
            placeholder="Enter notebook name"
            className="h-10 w-full rounded-md border border-black/[0.12] px-3 shadow-sm outline-none placeholder:text-sm"
            onChange={(e) => {
              setNotebookName(e.target.value);
            }}
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
