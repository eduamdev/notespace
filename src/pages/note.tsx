import { useParams } from "wouter";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NoteList from "@/components/notes/note-list";
import NoteEditor from "@/components/notes/note-editor";

export function NotePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <ResponsiveLayout
      mobileMainContent={<NoteEditor noteId={id} />}
      desktopMainContent={<NoteList />}
      desktopSecondaryContent={<NoteEditor noteId={id} />}
    />
  );
}
