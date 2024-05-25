import { useEffect, useState } from "react";
import { useEncryption } from "@/hooks/use-encryption";
import { getAllItems } from "@/services/storage-service";
import DesktopLayout from "@/components/layout/desktop-layout";
import NoteList from "@/components/notes/note-list";
import { Note } from "@/models/note";

export function NotesPage() {
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

  return (
    <>
      <DesktopLayout mainContent={<NoteList notes={notes} />} />;
    </>
  );
}
