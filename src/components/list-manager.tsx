import { ButtonHTMLAttributes, forwardRef, useState, useMemo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { DESKTOP_MEDIA_QUERY } from "@/lib/constants";

interface ListManagerProps<T> {
  title: string;
  description: string;
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
  addItemText?: string;
  filterItems?: (items: T[], query: string) => T[];
}

const ListManager = <T,>({
  title,
  description,
  useItemsHook,
  FormComponent,
  ListComponent,
  onAddItemClick,
  addItemText,
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

  const renderAddItemSection = () => {
    if (!addItemText || (!onAddItemClick && !FormComponent)) return null;

    if (onAddItemClick) {
      return <AddItemButton onClick={onAddItemClick} />;
    }

    if (FormComponent) {
      return isDesktop ? (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <AddItemButton />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new {addItemText}</DialogTitle>
              <DialogDescription className="sr-only">
                {description}
              </DialogDescription>
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
              <DrawerTitle>Create a new {addItemText}</DrawerTitle>
              <DrawerDescription className="sr-only">
                {description}
              </DrawerDescription>
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
      );
    }

    return null;
  };

  return (
    <>
      <div className="flex h-[68px] items-center justify-between py-4 lg:px-6">
        <h1 className="text-lg font-semibold text-black">{title}</h1>
        <div className="flex items-center justify-center gap-4">
          {renderAddItemSection()}
        </div>
      </div>
      <div className="py-2 lg:px-6">
        <button className="grid h-10 w-full grid-cols-[18px_1fr] items-center justify-center gap-x-3 rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08]">
          <SearchIcon className="size-[18px] text-neutral-600" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            className="outline-none placeholder:text-sm"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </button>
      </div>
      <div className="py-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <ListComponent items={filteredItems} />
        )}
      </div>
    </>
  );
};

export default ListManager;
