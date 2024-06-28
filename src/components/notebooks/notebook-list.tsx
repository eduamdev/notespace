import ItemList from "@/components/item-list";
import { Notebook } from "@/models/notebook";

interface NotebookListProps {
  notebooks: Notebook[] | undefined;
}

const NotebookList = ({ notebooks }: NotebookListProps) => {
  return (
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
  );
};

export default NotebookList;
