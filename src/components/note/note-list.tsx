import { useEffect, useState } from "react";
import { Link } from "wouter";
import { getNotes } from "@/services/note-service";
import { Note } from "@/types/note";

function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    void fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      console.log("fetching notes...");
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
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
    </div>
  );
}

export default NoteList;
