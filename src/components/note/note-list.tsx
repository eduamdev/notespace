import { useEffect, useState } from "react";
import { Link } from "wouter";
import { getNotes } from "@/services/note-service";
import { Note } from "@/types/note";

function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Fetch notes when component mounts
    void fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      console.log("fetching notes...");
      const fetchedNotes = await getNotes();
      console.log(fetchNotes);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div>
      <h1>Note List</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
