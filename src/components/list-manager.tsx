import { useState, useMemo, ReactNode } from "react";
import { SearchIcon } from "@/components/icons/search-icon";

interface ListManagerProps<T> {
  title: string;
  itemName: string;
  headerAction?: ReactNode;
  useItemsHook: () => {
    items: T[];
    error: Error | null;
    isLoading: boolean;
  };
  ListComponent: React.FC<{ items: T[] | undefined }>;
  filterItems?: (items: T[], query: string) => T[];
  noItemsMessage?: string;
}

const ListManager = <T,>({
  title,
  itemName,
  headerAction,
  useItemsHook,
  ListComponent,
  filterItems,
  noItemsMessage,
}: ListManagerProps<T>) => {
  const { items, error, isLoading } = useItemsHook();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(
    () => (filterItems ? filterItems(items, searchQuery) : items),
    [items, searchQuery, filterItems]
  );

  return (
    <>
      <div className="flex h-[68px] items-center justify-between p-4 lg:px-6">
        <h1 className="text-lg font-semibold text-black">{title}</h1>
        {headerAction && (
          <div className="flex items-center justify-center gap-4">
            {headerAction}
          </div>
        )}
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
