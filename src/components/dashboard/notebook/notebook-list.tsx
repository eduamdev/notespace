import { useEffect, useState } from "react";

import { createNotebook, getNotebooks } from "@/services/note-service";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { Notebook } from "@/types";

function NotebookList() {
  const [notebook, setNotebook] = useState("");
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  useEffect(() => {
    void fetchNotebooks();
  }, []);

  const fetchNotebooks = async () => {
    try {
      console.log("fetching notebooks...");
      const fetchedNotebooks = await getNotebooks();
      setNotebooks(fetchedNotebooks);
    } catch (error) {
      console.log("Error fetching notebooks:", error);
    }
  };

  const handleNotebookCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNotebook(notebook, [], []);
      alert(`New notebook created: ${notebook}`);
      setNotebook("");
    } catch (error) {
      console.error("Error creating notebook:", error);
    }
  };

  return (
    <div className="relative size-full after:absolute after:right-0 after:top-0 after:h-full after:w-px after:border-r after:border-neutral-950/10 after:content-['']">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-lg font-semibold text-black">Notebooks</h1>
        <div className="flex items-center justify-center gap-4">
          <button className="flex h-[34px] items-center justify-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50">
            <PlusIcon className="inline-block size-4" />
            <span className="pl-1.5 text-sm font-medium">Notebook</span>
          </button>
        </div>
      </div>
      <div className="px-6 py-3">
        <form onSubmit={(event) => void handleNotebookCreation(event)}>
          <input
            type="text"
            value={notebook}
            className="border p-2"
            onChange={(e) => {
              setNotebook(e.target.value);
            }}
            placeholder="Notebook"
          />
          <button type="submit" className="bg-gray-200 p-2">
            Create notebook
          </button>
        </form>
      </div>
      <div className="px-6 py-2">
        <button className="grid h-10 w-full grid-cols-[18px_1fr] items-center justify-center gap-x-3 rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08]">
          <SearchIcon className="size-[18px]" />
          <input
            type="text"
            placeholder="Search notebook..."
            className="outline-none"
          />
        </button>
      </div>
      <ul className="divide-y py-4">
        {notebooks.map((notebook) => (
          <li key={notebook.id} className="py-1">
            <span className="block w-full px-6">
              <p className="truncate text-[15px] font-medium text-black">
                {notebook.name}
              </p>
              <p className="text-[13px] text-neutral-500">0 notes</p>
            </span>
          </li>
        ))}
      </ul>
      <div className="hidden py-6">
        <form onSubmit={(event) => void handleNotebookCreation(event)}>
          <input
            type="text"
            value={notebook}
            className="border p-2"
            onChange={(e) => {
              setNotebook(e.target.value);
            }}
            placeholder="Notebook"
          />
          <button type="submit" className="bg-gray-200 p-2">
            Create notebook
          </button>
        </form>
      </div>
    </div>
  );
}

export default NotebookList;
