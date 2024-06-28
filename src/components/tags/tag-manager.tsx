import { forwardRef, useState } from "react";
import { useTags } from "@/hooks/use-tags";
import { useMediaQuery } from "@/hooks/use-media-query";
import TagForm from "@/components/tags/tag-form";
import TagList from "@/components/tags/tag-list";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";

const TagManager = () => {
  const { tags, addTag } = useTags();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const AddTagButton = forwardRef<HTMLButtonElement>((props, ref) => (
    <button
      ref={ref}
      className="flex h-9 items-center justify-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50"
      {...props}
    >
      <PlusIcon className="inline-block size-4" />
      <span className="pl-1.5 text-sm font-medium">Tag</span>
    </button>
  ));

  AddTagButton.displayName = "AddTagButton";

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-lg font-semibold text-black">Tags</h1>
        <div className="flex items-center justify-center gap-4">
          {isDesktop ? (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <AddTagButton />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a Tag</DialogTitle>
                </DialogHeader>
                <TagForm
                  addTag={addTag}
                  onClose={() => {
                    setIsModalOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DrawerTrigger asChild>
                <AddTagButton />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Create a Tag</DrawerTitle>
                </DrawerHeader>
                <TagForm
                  addTag={addTag}
                  onClose={() => {
                    setIsModalOpen(false);
                  }}
                  isDrawer
                />
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
            placeholder="Search tag..."
            className="outline-none"
          />
        </button>
      </div>
      <TagList tags={tags} />
    </>
  );
};

export default TagManager;
