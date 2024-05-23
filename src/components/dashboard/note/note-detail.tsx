import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { getNote } from "@/services/note-service";
import { Note } from "@/types";

function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    // Fetch note data from the server based on the ID
    const fetchNote = async () => {
      try {
        const fetchedNote = await getNote(id);
        setNote(fetchedNote);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    void fetchNote();
  }, [id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      <h2 className="font-medium text-black">{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}

export default NoteDetail;