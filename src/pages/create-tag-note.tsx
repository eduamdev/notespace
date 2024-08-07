import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import TagDetails from "@/components/notes/tag-details";
import NoteEditor from "@/components/notes/note-editor";

export function CreateTagNotePage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<NoteEditor />}
      desktopMainContent={<TagDetails />}
      desktopSecondaryContent={<NoteEditor />}
    />
  );
}
