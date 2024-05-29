import { useEffect, useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import NoteList from "@/components/notes/note-list";
import NoteEditor from "@/components/notes/note-editor";
import { Note } from "@/models/note";
import useFetchNotes from "@/hooks/use-fetch-notes";

export function NewNotePage() {
  const notes = useFetchNotes();
  const [localNotes, setLocalNotes] = useState<Note[]>(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const handleSaveNote = (newNote: Note) => {
    setLocalNotes([...localNotes, { ...newNote }]);
  };

  return (
    <>
      <DesktopLayout
        mainContent={<NoteList notes={localNotes} />}
        sideContent={<NoteEditor onSave={handleSaveNote} />}
      />
    </>
  );
}
