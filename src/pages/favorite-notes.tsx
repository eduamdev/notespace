import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import FavoriteNotesList from "@/components/notes/favorite-notes-list";

export function FavoriteNotesPage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<FavoriteNotesList />}
      desktopMainContent={<FavoriteNotesList />}
    />
  );
}
