import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import TagDetails from "@/components/notes/tag-details";

export function TagPage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<TagDetails />}
      desktopMainContent={<TagDetails />}
    />
  );
}
