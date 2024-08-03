import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import TagManager from "@/components/notes/tag-manager";

export function TagPage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<TagManager />}
      desktopMainContent={<TagManager />}
    />
  );
}
