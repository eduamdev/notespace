import DesktopLayout from "@/components/layout/desktop-layout";
import NotebookList from "@/components/notes/notebook-list";

export function NotebooksPage() {
  return (
    <>
      <DesktopLayout leftPanel={<NotebookList />} />;
    </>
  );
}
