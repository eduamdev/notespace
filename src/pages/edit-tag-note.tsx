import { useParams } from "wouter";
import { toast } from "sonner";
import { useNotes } from "@/hooks/use-notes";
import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NoteEditor from "@/components/notes/note-editor";
import TagDetails from "@/components/notes/tag-details";
import { NoteEditorSkeleton } from "@/components/notes/note-editor-skeleton";

export function EditTagNotePage() {
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
      desktopMainContent={<TagDetails />}
      desktopSecondaryContent={
        isLoading ? <NoteEditorSkeleton /> : <NoteEditor note={note} />
      }
    />
  );
}
