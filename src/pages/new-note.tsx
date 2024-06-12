import DesktopLayout from "@/components/layout/desktop-layout";
import NoteList from "@/components/notes/note-list";
import NoteEditor from "@/components/notes/note-editor";

export function NewNotePage() {
  return (
    <>
      <DesktopLayout mainContent={<NoteList />} sideContent={<NoteEditor />} />
    </>
  );
}
