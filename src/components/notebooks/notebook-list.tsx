import { Notebook } from "@/models/notebook";

interface NotebookListProps {
  notebooks: Notebook[] | undefined;
}

const NotebookList = ({ notebooks }: NotebookListProps) => {
  if (!notebooks) {
    return;
  }

  return (
    <ul className="divide-y py-4">
      {notebooks.map((notebook) => (
        <li key={notebook.id} className="py-2">
          <span className="block w-full">
            <p className="truncate text-[15px] font-medium text-black">
              {notebook.name}
            </p>
            <p className="text-[13px] text-neutral-500">0 notes</p>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default NotebookList;
