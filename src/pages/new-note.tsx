import { useEffect, useState } from "react";
import { useEncryption } from "@/hooks/use-encryption";
import { getAllItems } from "@/services/storage-service";
import Dashboard from "@/components/dashboard/dashboard-layout";
import NoteList from "@/components/notes/note-list";
import NoteEditor from "@/components/notes/note-editor";
import { Note } from "@/models/note";

export function NewNotePage() {
  const { decrypt } = useEncryption();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const encryptedNotes: Note[] = await getAllItems("notes");

      const decryptedNotes = await Promise.all(
        encryptedNotes.map(async (encryptedNote) => {
          const decryptedNote: Note = {
            ...encryptedNote,
            title: await decrypt(encryptedNote.title),
            content: await decrypt(encryptedNote.content),
          };
          return decryptedNote;
        })
      );
      setNotes(decryptedNotes);
    };
    void fetchNotes();
  }, [decrypt]);

  const handleSaveNote = (newNote: Note) => {
    setNotes([...notes, { ...newNote }]);
  };

  return (
    <>
      <Dashboard
        leftPanel={<NoteList notes={notes} />}
        rightPanel={
          <NoteEditor
            onSave={handleSaveNote}
            placeholder="Start writing something ..."
          />
        }
      />
    </>
  );
}