import { ReactNode } from "react";

interface Item {
  id: string;
}

interface ItemListProps<T extends Item> {
  items: T[] | undefined;
  renderItem: (item: T) => ReactNode;
}

const ItemList = <T extends Item>({ items, renderItem }: ItemListProps<T>) => {
  if (!items) {
    return null;
  }

  return (
    <ul className="divide-y">
      {items.map((item) => (
        <li key={item.id} className="py-1">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
