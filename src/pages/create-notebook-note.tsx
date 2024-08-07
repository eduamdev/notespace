import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NotebookDetails from "@/components/notes/notebook-details";
import NoteEditor from "@/components/notes/note-editor";

export function CreateNotebookNotePage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<NoteEditor />}
      desktopMainContent={<NotebookDetails />}
      desktopSecondaryContent={<NoteEditor />}
    />
  );
}
