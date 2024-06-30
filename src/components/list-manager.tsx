import { ButtonHTMLAttributes, forwardRef, useState, useMemo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
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
import { DESKTOP_MEDIA_QUERY } from "@/lib/constants";

interface ListManagerProps<T> {
  title: string;
  addItemText: string;
  useItemsHook: () => {
    items: T[];
    addItem: (item: T) => void;
    error: Error | null;
    isLoading: boolean;
  };
  FormComponent?: React.ComponentType<{
    addItem: (item: T) => void;
    onClose: () => void;
    isDrawer?: boolean;
  }>;
  ListComponent: React.FC<{ items: T[] | undefined }>;
  onAddItemClick?: () => void;
  filterItems?: (items: T[], query: string) => T[];
}

const ListManager = <T,>({
  title,
  addItemText,
  useItemsHook,
  FormComponent,
  ListComponent,
  onAddItemClick,
  filterItems,
}: ListManagerProps<T>) => {
  const { items, addItem, error, isLoading } = useItemsHook();
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

  const filteredItems = useMemo(
    () => (filterItems ? filterItems(items, query) : items),
    [items, query, filterItems]
  );

  const AddItemButton = forwardRef<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
  >((props, ref) => (
    <button
      ref={ref}
      className="flex h-9 items-center justify-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50"
      {...props}
    >
      <PlusIcon className="inline-block size-4" />
      <span className="pl-1.5 text-sm font-medium">{addItemText}</span>
    </button>
  ));

  AddItemButton.displayName = "AddItemButton";

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-lg font-semibold text-black">{title}</h1>
        <div className="flex items-center justify-center gap-4">
          {onAddItemClick ? (
            <AddItemButton onClick={onAddItemClick} />
          ) : (
            FormComponent &&
            (isDesktop ? (
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <AddItemButton />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a {addItemText}</DialogTitle>
                  </DialogHeader>
                  <FormComponent
                    addItem={addItem}
                    onClose={() => {
                      setIsModalOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DrawerTrigger asChild>
                  <AddItemButton />
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Create a {addItemText}</DrawerTitle>
                  </DrawerHeader>
                  <FormComponent
                    addItem={addItem}
                    onClose={() => {
                      setIsModalOpen(false);
                    }}
                    isDrawer
                  />
                </DrawerContent>
              </Drawer>
            ))
          )}
        </div>
      </div>
      <div className="py-2">
        <button className="grid h-10 w-full grid-cols-[18px_1fr] items-center justify-center gap-x-3 rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08]">
          <SearchIcon className="size-[18px] text-neutral-600" />
          <input
            type="text"
            placeholder={`Search ${addItemText.toLowerCase()}...`}
            className="outline-none"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ListComponent items={filteredItems} />
      )}
    </>
  );
};

export default ListManager;
