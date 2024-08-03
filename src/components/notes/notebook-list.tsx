import { Link } from "wouter";
import { useNotebooks } from "@/hooks/use-notebooks";
import { useNotes } from "@/hooks/use-notes";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import NotebookForm from "@/components/notes/notebook-form";
import { filterNotebooks, getNoteCountForNotebook } from "@/lib/notes";
import { Notebook } from "@/models/notebook";

const NotebookList = () => {
  const { createItem } = useNotebooks();
  const { items: notes } = useNotes();

  return (
    <ListManager<Notebook>
      title="Notebooks"
      itemName="Notebook"
      useItemsHook={useNotebooks}
      headerAction={<NotebookForm createItem={createItem} />}
      ListComponent={({ items: notebooks }) => (
        <ItemList
          items={notebooks}
          renderItem={(notebook) => {
            const noteCount = getNoteCountForNotebook(notebook, notes);

            return (
              <Link href={`/notebooks/${notebook.id}`}>
                <div className="w-full px-4 py-1 hover:bg-neutral-50 lg:px-6">
                  <p className="truncate font-semibold text-black">
                    {notebook.name}
                  </p>
                  <p className="truncate text-[13px] leading-6 text-neutral-500">
                    {noteCount} {noteCount === 1 ? "note" : "notes"}
                  </p>
                </div>
              </Link>
            );
          }}
        />
      )}
      filterItems={filterNotebooks}
    />
  );
};

export default NotebookList;
