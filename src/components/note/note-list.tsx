import { useEffect, useState } from "react";
import { Link } from "wouter";
import { getNotes } from "@/services/note-service";
import { createNotebook, getNotebooks } from "@/services/notebook-service";
import { Note, Notebook } from "@/types";

function NoteList() {
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

  const handleNotebookClick = async (name: string) => {
    await createNotebook(name, [], []);
    alert(`New notebook created: ${name}`);
  };

  return (
    <div>
      <h1 className="py-3 text-xl font-semibold">All notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>
              <p>{note.title}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="py-6">
        <h2 className="py-3 text-xl font-semibold">Notebooks</h2>
        <button
          className="bg-gray-200 p-2"
          onClick={() => {
            void handleNotebookClick("New Notebook");
          }}
        >
          Create notebook
        </button>
        <div className="py-3">
          <ul>
            {notebooks.map((notebook) => (
              <li key={notebook.id}>
                <p>{notebook.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NoteList;
