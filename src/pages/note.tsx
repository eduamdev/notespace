import { useParams } from "wouter";
import DesktopLayout from "@/components/layout/desktop-layout";
import NoteList from "@/components/notes/note-list";
import NoteEditor from "@/components/notes/note-editor";

export function NotePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <DesktopLayout
        mainContent={<NoteList />}
        sideContent={<NoteEditor noteId={id} />}
      />
    </>
  );
}
