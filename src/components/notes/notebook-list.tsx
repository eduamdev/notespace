import { useNotebooks } from "@/hooks/use-notebooks";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import NotebookForm from "@/components/notes/notebook-form";
import { Notebook } from "@/models/notebook";

const filterNotebooks = (notebooks: Notebook[], query: string) => {
  if (!query) return notebooks;
  return notebooks.filter((notebook) =>
    notebook.name.toLowerCase().includes(query.toLowerCase())
  );
};

const NotebookList = () => {
  return (
    <ListManager<Notebook>
      title="Notebooks"
      description="Organize your notes by creating a new notebook with a meaningful title."
      useItemsHook={useNotebooks}
      FormComponent={NotebookForm}
      addItemText="Notebook"
      ListComponent={({ items: notebooks }) => (
        <ItemList
          items={notebooks}
          renderItem={(notebook) => (
            <div className="block w-full hover:bg-neutral-50 lg:px-6">
              <p className="truncate text-[15px] font-medium text-black">
                {notebook.name}
              </p>
              <p className="text-[13px] text-neutral-500">0 notes</p>
            </div>
          )}
        />
      )}
      filterItems={filterNotebooks}
    />
  );
};

export default NotebookList;
