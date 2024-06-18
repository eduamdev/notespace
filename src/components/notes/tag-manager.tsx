import { useState } from "react";
import { useTags } from "@/hooks/use-tags";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { Tag } from "@/models/tag";

const TagManager = () => {
  const { tags, addTag } = useTags();
  const [newTagName, setNewTagName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      addTag({
        id: new Date().toISOString(),
        name: newTagName,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Tag);

      setNewTagName("");
      setIsModalOpen(false);
      toast.success(`Tag has been created`);
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-lg font-semibold text-black">Tags</h1>
        <div className="flex items-center justify-center gap-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="flex h-9 items-center justify-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50">
                <PlusIcon className="inline-block size-4" />
                <span className="pl-1.5 text-sm font-medium">Tag</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a Tag</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(event) => {
                  handleAddTag(event);
                }}
              >
                <div className="py-5">
                  <div className="flex flex-col">
                    <label htmlFor="tagTxt" className="sr-only">
                      Tag:
                    </label>
                    <input
                      type="text"
                      id="tagTxt"
                      value={newTagName}
                      placeholder="Tag"
                      className="h-10 w-full items-center justify-center rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08] outline-none"
                      onChange={(e) => {
                        setNewTagName(e.target.value);
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
        </div>
      </div>
      <div className="py-2">
        <button className="grid h-10 w-full grid-cols-[18px_1fr] items-center justify-center gap-x-3 rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08]">
          <SearchIcon className="size-[18px] text-neutral-600" />
          <input
            type="text"
            placeholder="Search tag..."
            className="outline-none"
          />
        </button>
      </div>
      <ul className="divide-y py-4">
        {tags?.map((tag) => (
          <li key={tag.id} className="py-2">
            <span className="block w-full">
              <p className="truncate text-[15px] font-medium text-black">
                {tag.name}
              </p>
              <p className="text-[13px] text-neutral-500">0 notes</p>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TagManager;
