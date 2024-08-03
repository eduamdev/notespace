import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import TagManager from "@/components/notes/tag-manager";
import NoteEditor from "@/components/notes/note-editor";

export function CreateTagNotePage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<NoteEditor />}
      desktopMainContent={<TagManager />}
      desktopSecondaryContent={<NoteEditor />}
    />
  );
}
