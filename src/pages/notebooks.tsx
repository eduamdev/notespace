import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NotebookManager from "@/components/notebooks/notebook-manager";

export function NotebooksPage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<NotebookManager />}
      desktopMainContent={<NotebookManager />}
    />
  );
}
