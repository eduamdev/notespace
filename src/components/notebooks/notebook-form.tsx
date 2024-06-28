import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { DialogClose } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Notebook } from "@/models/notebook";
import { cn } from "@/lib/utils";

interface NotebookFormProps {
  addNotebook: (notebook: Notebook) => void;
  onClose: () => void;
  isDrawer?: boolean;
}

export default function NotebookForm({
  addNotebook,
  onClose,
  isDrawer = false,
}: NotebookFormProps) {
  const [newNotebookName, setNewNotebookName] = useState("");

  const handleAddNotebook = (e: FormEvent) => {
    e.preventDefault();

    try {
      addNotebook({
        id: new Date().toISOString(),
        name: newNotebookName,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Notebook);

      setNewNotebookName("");
      onClose();
      toast.success("Notebook has been created");
    } catch (error) {
      toast.error("Error creating notebook");
      console.error("Error creating notebook:", error);
    }
  };

  return (
    <form onSubmit={handleAddNotebook}>
      <div className={cn("py-5", isDrawer && "px-4")}>
        <div className="flex flex-col">
          <label htmlFor="txtNewNotebookName" className="sr-only">
            Notebook:
          </label>
          <input
            type="text"
            id="txtNewNotebookName"
            value={newNotebookName}
            placeholder="Notebook"
            className="h-10 w-full rounded-md border border-black/[0.12] px-3 text-sm shadow-sm outline-none lg:text-[15px]"
            onChange={(e) => {
              setNewNotebookName(e.target.value);
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
              Create
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
          <div className="flex items-center justify-end gap-x-3.5 pt-4">
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
              Create
            </button>
          </div>
        )}
      </>
    </form>
  );
}
