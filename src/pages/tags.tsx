import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import TagList from "@/components/notes/tag-list";

export function TagsPage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<TagList />}
      desktopMainContent={<TagList />}
    />
  );
}
