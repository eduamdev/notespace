import { useNotebooks } from "@/hooks/use-notebooks";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import NotebookForm from "@/components/notes/notebook-form";
import { Notebook } from "@/models/notebook";

const NotebookList = () => {
  return (
    <ListManager<Notebook>
      title="Notebooks"
      addItemText="Notebook"
      useItemsHook={useNotebooks}
      FormComponent={NotebookForm}
      ListComponent={({ items: notebooks }) => (
        <ItemList
          items={notebooks}
          renderItem={(notebook) => (
            <span className="block w-full">
              <p className="truncate text-[15px] font-medium text-black">
                {notebook.name}
              </p>
              <p className="text-[13px] text-neutral-500">0 notes</p>
            </span>
          )}
        />
      )}
    />
  );
};

export default NotebookList;
