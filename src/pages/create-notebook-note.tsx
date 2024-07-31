import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NotebookManager from "@/components/notes/notebook-manager";
import NoteEditor from "@/components/notes/note-editor";

export function CreateNotebookNotePage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<NoteEditor />}
      desktopMainContent={<NotebookManager />}
      desktopSecondaryContent={<NoteEditor />}
    />
  );
}
