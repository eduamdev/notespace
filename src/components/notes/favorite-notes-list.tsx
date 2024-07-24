import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { useNotes } from "@/hooks/use-notes";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import NoteActions from "@/components/notes/note-actions";
import { sortNotesByUpdatedAtDescending } from "@/lib/utils";
import { Note } from "@/models/note";

const filterFavoriteNotes = (notes: Note[], query: string) => {
  if (!query) return notes.filter((note) => note.isFavorite);
  return notes
    .filter((note) => note.isFavorite)
    .filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.contentText.toLowerCase().includes(query.toLowerCase())
    );
};

function FavoriteNotesList() {
  const { updateItem, deleteItem } = useNotes();

  const handleFavoriteClick = (note: Note) => {
    updateItem({
      ...note,
      isFavorite: !note.isFavorite,
    });
  };

  const handleDeleteClick = (noteId: string) => {
    deleteItem(noteId);
  };

  return (
    <ListManager<Note>
      title="Favorites"
      description=""
      itemName="Favorite"
      useItemsHook={useNotes}
      ListComponent={({ items: notes }) => (
        <ItemList
          items={notes}
          renderItem={(note) => (
            <div className="group/item relative">
              <Link
                to={`/favorites/notes/${note.id}/edit`}
                className="grid grid-cols-1 items-start justify-center gap-4 px-4 hover:bg-neutral-50 lg:px-6"
              >
                <div className="relative block w-full overflow-hidden py-1">
                  <p className="truncate font-semibold leading-6 text-black">
                    {note.title}
                  </p>
                  <p className="line-clamp-2 text-[15px] text-neutral-600">
                    {note.contentText}
                  </p>
                  <p className="truncate text-[13px] leading-7 text-neutral-500">
                    {formatDistanceToNow(new Date(note.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </Link>
              <NoteActions
                note={note}
                onFavoriteClick={handleFavoriteClick}
                onDeleteClick={handleDeleteClick}
              />
            </div>
          )}
          sortFn={sortNotesByUpdatedAtDescending}
        />
      )}
      filterItems={filterFavoriteNotes}
      noItemsMessage="You haven't added any notes to your favorites yet. Start exploring and click the star icon to mark your favorite notes!"
    />
  );
}

export default FavoriteNotesList;
