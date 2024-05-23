import Dashboard from "@/components/dashboard/dashboard-layout";

import TagManager from "@/components/notes/tag-manager";

export function TagsPage() {
  return (
    <>
      <Dashboard leftPanel={<TagManager />} />;
    </>
  );
}
