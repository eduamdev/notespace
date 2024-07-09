import { Link } from "wouter";
import { useNotes } from "@/hooks/use-notes";
import { formatDistanceToNow } from "date-fns";
import ItemList from "@/components/item-list";
import ListManager from "@/components/list-manager";
import { HeartIcon } from "@/components/icons/heart-icon";
import { HeartFilledIcon } from "@/components/icons/heart-filled-icon";
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

function FavoriteNotes() {
  const { updateItem } = useNotes();

  const handleFavoriteClick = (note: Note) => {
    updateItem({
      ...note,
      isFavorite: !note.isFavorite,
    });
  };

  return (
    <ListManager<Note>
      title="Favorite Notes"
      description=""
      useItemsHook={useNotes}
      ListComponent={({ items: notes }) => (
        <ItemList
          items={notes}
          renderItem={(note) => (
            <div className="grid grid-cols-[1fr_auto] items-start justify-center gap-2 px-4 hover:bg-neutral-50 lg:px-6">
              <Link
                to={`/notes/${note.id}`}
                className="block w-full overflow-hidden py-1"
              >
                <p className="truncate font-semibold leading-6 text-black">
                  {note.title}
                </p>
                <p className="line-clamp-2 text-[15px] text-neutral-600">
                  {note.contentText}
                </p>
                <p className="truncate text-[13px] leading-7 text-neutral-500">
                  {formatDistanceToNow(new Date(note.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </Link>
              <button
                className="group z-10 p-2"
                onClick={() => {
                  handleFavoriteClick(note);
                }}
              >
                {note.isFavorite ? (
                  <HeartFilledIcon className="size-4 shrink-0 text-red-400 transition-opacity group-hover:opacity-80" />
                ) : (
                  <HeartIcon className="size-4 shrink-0 text-neutral-700 transition-colors group-hover:text-red-400" />
                )}
              </button>
            </div>
          )}
        />
      )}
      filterItems={filterFavoriteNotes}
    />
  );
}

export default FavoriteNotes;
