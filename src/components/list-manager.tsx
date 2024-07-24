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
  itemName: string;
  useItemsHook: () => {
    items: T[];
    createItem: (item: T) => void;
    error: Error | null;
    isLoading: boolean;
  };
  FormComponent?: React.ComponentType<{
    createItem: (item: T) => void;
    onClose: () => void;
    isDrawer?: boolean;
  }>;
  ListComponent: React.FC<{ items: T[] | undefined }>;
  onCreateItemButtonClick?: () => void;
  filterItems?: (items: T[], query: string) => T[];
  noItemsMessage?: string;
}

const ListManager = <T,>({
  title,
  description,
  itemName,
  useItemsHook,
  FormComponent,
  ListComponent,
  onCreateItemButtonClick,
  filterItems,
  noItemsMessage,
}: ListManagerProps<T>) => {
  const { items, createItem, error, isLoading } = useItemsHook();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

  const filteredItems = useMemo(
    () => (filterItems ? filterItems(items, searchQuery) : items),
    [items, searchQuery, filterItems]
  );

  const CreateItemButton = forwardRef<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
  >((props, ref) => (
    <button
      ref={ref}
      className="flex h-9 items-center justify-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50"
      {...props}
    >
      <PlusIcon className="inline-block size-4" />
      <span className="pl-1.5 text-sm font-medium">New {itemName}</span>
    </button>
  ));

  CreateItemButton.displayName = "CreateItemButton";

  const renderCreateItemSection = () => {
    if (!onCreateItemButtonClick && !FormComponent) return null;

    if (onCreateItemButtonClick) {
      return <CreateItemButton onClick={onCreateItemButtonClick} />;
    }

    if (FormComponent) {
      return isDesktop ? (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <CreateItemButton />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New {itemName}</DialogTitle>
              <DialogDescription className="sr-only">
                {description}
              </DialogDescription>
            </DialogHeader>
            <FormComponent
              createItem={createItem}
              onClose={() => {
                setIsModalOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DrawerTrigger asChild>
            <CreateItemButton />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Create New {itemName}</DrawerTitle>
              <DrawerDescription className="sr-only">
                {description}
              </DrawerDescription>
            </DrawerHeader>
            <FormComponent
              createItem={createItem}
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
      <div className="flex h-[68px] items-center justify-between p-4 lg:px-6">
        <h1 className="text-lg font-semibold text-black">{title}</h1>
        <div className="flex items-center justify-center gap-4">
          {renderCreateItemSection()}
        </div>
      </div>
      <div className="px-4 py-2 lg:px-6">
        <button className="grid h-10 w-full grid-cols-[18px_1fr] items-center justify-center gap-x-3 rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08]">
          <SearchIcon className="size-[18px] text-neutral-600" />
          <input
            type="text"
            placeholder={`Search ${itemName.toLowerCase()}s...`}
            className="outline-none placeholder:text-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </button>
      </div>
      <div className="py-4">
        {isLoading ? (
          <p className="px-4 py-2 lg:px-6">Loading...</p>
        ) : error ? (
          <p className="px-4 py-2 lg:px-6">Error: {error.message}</p>
        ) : filteredItems.length === 0 ? (
          <p className="px-4 py-2 font-serif tracking-wide text-neutral-600 lg:px-6">
            {!searchQuery
              ? noItemsMessage ??
                `You haven't created any ${itemName.toLowerCase()}s yet. Add your first ${itemName.toLowerCase()}.`
              : `No results found. Adjust your search and try again.`}
          </p>
        ) : (
          <ListComponent items={filteredItems} />
        )}
      </div>
    </>
  );
};

export default ListManager;
