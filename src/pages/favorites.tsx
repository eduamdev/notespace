import { ResponsiveLayout } from "@/components/layout/responsive-layout";
import FavoriteNotes from "@/components/notes/favorite-notes";

export function FavoritesPage() {
  return (
    <ResponsiveLayout
      mobileMainContent={<FavoriteNotes />}
      desktopMainContent={<FavoriteNotes />}
    />
  );
}
