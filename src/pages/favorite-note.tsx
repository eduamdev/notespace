import { useParams } from "wouter";
import { toast } from "sonner";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import FavoriteNotesList from "@/components/notes/favorite-notes-list";
import NoteEditor from "@/components/notes/note-editor";
import { useNotes } from "@/hooks/use-notes";

export function FavoriteNotePage() {
  const { noteId } = useParams<{ noteId: string }>();

  const { singleItem: note, error, isLoading } = useNotes(noteId);

  if (error) {
    toast.error("Error loading note data");
    console.error(`Error fetching note (note id: ${noteId}):`, error);
  }

  return (
    <ResponsiveLayout
      mobileMainContent={isLoading ? "loading..." : <NoteEditor note={note} />}
      desktopMainContent={<FavoriteNotesList />}
      desktopSecondaryContent={
        isLoading ? "loading..." : <NoteEditor note={note} />
      }
    />
  );
}
