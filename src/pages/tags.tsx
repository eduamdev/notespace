import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import TagManager from "@/components/tags/tag-manager";

export function TagsPage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<TagManager />}
      desktopMainContent={<TagManager />}
    />
  );
}
