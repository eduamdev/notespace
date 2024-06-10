import DesktopLayout from "@/components/layout/desktop-layout";
import NoteList from "@/components/notes/note-list";
// import useFetchNotes from "@/hooks/use-fetch-notes";

export function NotesPage() {
  // const notes = useFetchNotes();

  return (
    <>
      <DesktopLayout mainContent={<NoteList notes={[]} />} />;
    </>
  );
}
