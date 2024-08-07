import { ReactNode } from "react";

interface Item {
  id: string;
  updatedAt: Date;
}

interface ItemListProps<T extends Item> {
  items: T[] | undefined;
  renderItem: (item: T) => ReactNode;
  sortFn?: (a: T, b: T) => number;
}

const ItemList = <T extends Item>({
  items,
  renderItem,
  sortFn,
}: ItemListProps<T>) => {
  if (!items) {
    return null;
  }

  // Sort items based on the provided sort function if available
  const sortedItems = sortFn ? [...items].sort(sortFn) : items;

  return (
    <ul className="divide-y">
      {sortedItems.map((item) => (
        <li key={item.id} className="py-1">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
