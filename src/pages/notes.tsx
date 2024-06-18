import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NoteList from "@/components/notes/note-list";

export function NotesPage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<NoteList />}
      desktopMainContent={<NoteList />}
    />
  );
}
