import { useEffect, useState } from "react";
import { useParams } from "wouter";
import useFetchNotes from "@/hooks/use-fetch-notes";
import DesktopLayout from "@/components/layout/desktop-layout";
import NoteList from "@/components/notes/note-list";
import NoteEditor from "@/components/notes/note-editor";
import { Note } from "@/models/note";

export function NotePage() {
  const { id } = useParams<{ id: string }>();
  const notes = useFetchNotes();
  const [localNotes, setLocalNotes] = useState<Note[]>(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const handleSaveNote = (newNote: Note) => {
    setLocalNotes([
      ...notes.filter((note) => note.id !== newNote.id),
      { ...newNote },
    ]);
  };

  return (
    <>
      <DesktopLayout
        mainContent={<NoteList notes={localNotes} />}
        sideContent={<NoteEditor onSave={handleSaveNote} noteId={id} />}
      />
    </>
  );
}
