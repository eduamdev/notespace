import { useParams } from "wouter";
import { toast } from "sonner";
import { useNotes } from "@/hooks/use-notes";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NoteList from "@/components/notes/note-list";
import NoteEditor from "@/components/notes/note-editor";
import { NoteEditorSkeleton } from "@/components/notes/note-editor-skeleton";

export function EditNotePage() {
  const { noteId } = useParams<{ noteId: string }>();

  const { singleItem: note, error, isLoading } = useNotes(noteId);

  if (error) {
    toast.error("Error loading note data");
    console.error(`Error fetching note (note id: ${noteId}):`, error);
  }

  return (
    <ResponsiveLayout
      mobileMainContent={
        isLoading ? <NoteEditorSkeleton /> : <NoteEditor note={note} />
      }
      desktopMainContent={<NoteList />}
      desktopSecondaryContent={
        isLoading ? <NoteEditorSkeleton /> : <NoteEditor note={note} />
      }
    />
  );
}
