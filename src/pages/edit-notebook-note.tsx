import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NoteEditor from "@/components/notes/note-editor";
import NotebookManager from "@/components/notes/notebook-manager";
import { useNotes } from "@/hooks/use-notes";
import { toast } from "sonner";
import { useParams } from "wouter";

export function EditNotebookNotePage() {
  const { noteId } = useParams<{ noteId: string }>();

  const { singleItem: note, error, isLoading } = useNotes(noteId);

  if (error) {
    toast.error("Error loading note data");
    console.error(`Error fetching note (note id: ${noteId}):`, error);
  }

  return (
    <ResponsiveLayout
      mobileMainContent={isLoading ? "loading..." : <NoteEditor note={note} />}
      desktopMainContent={<NotebookManager />}
      desktopSecondaryContent={
        isLoading ? "loading..." : <NoteEditor note={note} />
      }
    />
  );
}
