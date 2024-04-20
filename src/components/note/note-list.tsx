import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  getNotes,
  createNotebook,
  getNotebooks,
} from "@/services/note-service";
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
    <div>
      <h1 className="py-3 text-xl font-semibold">All notes</h1>
      <div className="my-4">
        <Link href="/notes/new">New note</Link>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>
              <div className="flex items-center gap-2.5">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  className="inline-block select-none overflow-visible align-text-bottom"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"></path>
                </svg>
                <span>{note.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="py-6">
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
                {/* <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="inline-block select-none overflow-visible align-text-bottom text-blue-400"
                >
                  <path d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 0 0 .2.1H13a1 1 0 0 1 1 1v.5H2.75a.75.75 0 0 0 0 1.5h11.978a1 1 0 0 1 .994 1.117L15 13.25A1.75 1.75 0 0 1 13.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75c0-.464.184-.91.513-1.237Z"></path>
                </svg> */}
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
