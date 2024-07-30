import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NotebookManager from "@/components/notes/notebook-manager";

export function CreateNotebookNotePage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<NotebookManager />}
      desktopMainContent={<NotebookManager />}
    />
  );
}
