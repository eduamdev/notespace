import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NotebookList from "@/components/notes/notebook-list";

export function NotebooksPage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<NotebookList />}
      desktopMainContent={<NotebookList />}
    />
  );
}
