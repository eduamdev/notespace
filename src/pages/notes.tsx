import DesktopLayout from "@/components/layout/desktop-layout";
import NoteList from "@/components/notes/note-list";

export function NotesPage() {
  return (
    <>
      <DesktopLayout mainContent={<NoteList />} />;
    </>
  );
}
