import DesktopLayout from "@/components/layout/desktop-layout";
import TagManager from "@/components/notes/tag-manager";

export function TagsPage() {
  return (
    <>
      <DesktopLayout mainContent={<TagManager />} />;
    </>
  );
}
