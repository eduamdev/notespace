import { useNotebooks } from "@/hooks/use-notebooks";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import NotebookForm from "@/components/notes/notebook-form";
import { filterNotebooks } from "@/lib/notes";
import { Notebook } from "@/models/notebook";
import { Link } from "wouter";

const NotebookList = () => {
  const { createItem } = useNotebooks();

  return (
    <ListManager<Notebook>
      title="Notebooks"
      itemName="Notebook"
      useItemsHook={useNotebooks}
      headerAction={<NotebookForm createItem={createItem} />}
      ListComponent={({ items: notebooks }) => (
        <ItemList
          items={notebooks}
          renderItem={(notebook) => (
            <Link href={`/notebooks/${notebook.id}`}>
              <div className="block w-full px-4 py-1 hover:bg-neutral-50 lg:px-6">
                <p className="truncate font-semibold leading-6 text-black">
                  {notebook.name}
                </p>
                <p className="truncate text-[13px] leading-7 text-neutral-500">
                  0 notes
                </p>
              </div>
            </Link>
          )}
        />
      )}
      filterItems={filterNotebooks}
    />
  );
};

export default NotebookList;
