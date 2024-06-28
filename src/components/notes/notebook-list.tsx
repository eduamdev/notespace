import { FormEvent, useState } from "react";
import { useNotebooks } from "@/hooks/use-notebooks";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { Notebook } from "@/models/notebook";
import { useMediaQuery } from "@/hooks/use-media-query";

function NotebookList() {
  const { notebooks, addNotebook } = useNotebooks();
  const [newNotebookName, setNewNotebookName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
      setIsModalOpen(false);
      toast.success(`Notebook has been created`);
    } catch (error) {
      console.error("Error creating notebook:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-lg font-semibold text-black">Notebooks</h1>
        <div className="flex items-center justify-center gap-4">
          {isDesktop ? (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button className="flex h-9 items-center justify-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50">
                  <PlusIcon className="inline-block size-4" />
                  <span className="pl-1.5 text-sm font-medium">Notebook</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a Notebook</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(event) => {
                    handleAddNotebook(event);
                  }}
                >
                  <div className="py-5">
                    <div className="flex flex-col">
                      <label htmlFor="txtNewNotebookName" className="sr-only">
                        Notebook:
                      </label>
                      <input
                        type="text"
                        id="txtNewNotebookName"
                        value={newNotebookName}
                        placeholder="Notebook"
                        className="h-10 w-full items-center justify-center rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08] outline-none"
                        onChange={(e) => {
                          setNewNotebookName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
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
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DrawerTrigger asChild>
                <button className="flex h-9 items-center justify-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50">
                  <PlusIcon className="inline-block size-4" />
                  <span className="pl-1.5 text-sm font-medium">Notebook</span>
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <form
                  onSubmit={(event) => {
                    handleAddNotebook(event);
                  }}
                >
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Create a Notebook</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 py-5">
                    <div className="flex flex-col">
                      <label htmlFor="txtNewNotebookName" className="sr-only">
                        Notebook:
                      </label>
                      <input
                        type="text"
                        id="txtNewNotebookName"
                        value={newNotebookName}
                        placeholder="Notebook"
                        className="h-9 w-full items-center justify-center rounded-md border border-black/[0.12] px-3 text-sm shadow-sm shadow-black/[0.08] outline-none"
                        onChange={(e) => {
                          setNewNotebookName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <DrawerFooter className="pt-4">
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
                </form>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
      <div className="py-2">
        <button className="grid h-10 w-full grid-cols-[18px_1fr] items-center justify-center gap-x-3 rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08]">
          <SearchIcon className="size-[18px] text-neutral-600" />
          <input
            type="text"
            placeholder="Search notebook..."
            className="outline-none"
          />
        </button>
      </div>
      <ul className="divide-y py-4">
        {notebooks?.map((notebook) => (
          <li key={notebook.id} className="py-2">
            <span className="block w-full">
              <p className="truncate text-[15px] font-medium text-black">
                {notebook.name}
              </p>
              <p className="text-[13px] text-neutral-500">0 notes</p>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NotebookList;
