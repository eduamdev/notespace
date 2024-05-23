import Dashboard from "@/components/dashboard/dashboard-layout";
import NotebookList from "@/components/notes/notebook-list";

export function NotebooksPage() {
  return (
    <>
      <Dashboard leftPanel={<NotebookList />} />;
    </>
  );
}
