import { useEffect, useState } from "react";
import { Link } from "wouter";

import {
  getNotes,
  createNotebook,
  getNotebooks,
} from "@/services/note-service";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { Note, Notebook } from "@/types";

function NoteList() {
  const [notebook, setNotebook] = useState("");

  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    void fetchNotebooks();
    void fetchNotes();
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

  const fetchNotes = async () => {
    try {
      console.log("fetching notes...");
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
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
        <h1 className="text-lg font-semibold text-black">Notes</h1>
        <div className="flex items-center justify-center gap-4">
          <button>
            <SearchIcon className="size-5" />
          </button>
          <Link
            href="/notes/new"
            className="flex h-[34px] items-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50"
          >
            <PlusIcon className="inline-block size-4" />
            <span className="pl-1.5 text-sm font-medium">Note</span>
          </Link>
        </div>
      </div>
      <ul className="space-y-4 px-6 py-4">
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`} className="block w-full">
              <p className="truncate text-[15px] font-medium text-black">
                {note.title}
              </p>
              <p className="line-clamp-2 text-[15px]">{note.content}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden py-6">
        <h2 className="py-3 text-xl font-semibold">Notebooks</h2>
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
        <div className="py-3">
          <ul>
            {notebooks.map((notebook) => (
              <li key={notebook.id} className="flex items-center gap-2.5">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  className="inline-block select-none overflow-visible align-text-bottom text-blue-400"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"></path>
                </svg>
                <span>{notebook.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NoteList;
