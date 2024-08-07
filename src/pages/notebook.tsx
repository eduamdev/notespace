import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import NotebookDetails from "@/components/notes/notebook-details";

export function NotebookPage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<NotebookDetails />}
      desktopMainContent={<NotebookDetails />}
    />
  );
}
