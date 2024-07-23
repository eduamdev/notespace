import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NoteList from "@/components/notes/note-list";
import NoteEditor from "@/components/notes/note-editor";

export function CreateNotePage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<NoteList />}
      desktopMainContent={<NoteList />}
      desktopSecondaryContent={<NoteEditor />}
    />
  );
}
