import { Link, useLocation } from "wouter";
import { useNotes } from "@/hooks/use-notes";
import ItemList from "@/components/item-list";
import ListManager from "@/components/list-manager";
import { HeartIcon } from "@/components/icons/heart-icon";
import { HeartFilledIcon } from "@/components/icons/heart-filled-icon";
import { Note } from "@/models/note";

const filterNotes = (notes: Note[], query: string) => {
  if (!query) return notes;
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.contentText.toLowerCase().includes(query.toLowerCase())
  );
};

function NoteList() {
  const [, navigate] = useLocation();
  const { updateItem } = useNotes();

  const handleFavoriteClick = (note: Note) => {
    const updatedNote = { ...note, isFavorite: !note.isFavorite };
    updateItem(updatedNote);
  };

  return (
    <ListManager<Note>
      title="Notes"
      addItemText="Note"
      useItemsHook={useNotes}
      ListComponent={({ items: notes }) => (
        <ItemList
          items={notes}
          renderItem={(note) => (
            <div className="grid grid-cols-[1fr_24px] items-start justify-center gap-2 hover:bg-neutral-50 lg:px-6">
              <Link
                to={`/notes/${note.id}`}
                className="block w-full overflow-hidden"
              >
                <p className="truncate text-[15px] font-medium text-black">
                  {note.title}
                </p>
                <p className="line-clamp-2 text-[15px]">{note.contentText}</p>
                <p className="truncate text-[13px] text-neutral-500">Now</p>
              </Link>
              <button
                className="z-10 p-2"
                onClick={() => {
                  handleFavoriteClick(note);
                }}
              >
                {note.isFavorite ? (
                  <HeartFilledIcon className="size-4 shrink-0 text-red-400" />
                ) : (
                  <HeartIcon className="size-4 shrink-0 text-neutral-700" />
                )}
              </button>
            </div>
          )}
        />
      )}
      onAddItemClick={() => {
        navigate("/notes/new");
      }}
      filterItems={filterNotes}
    />
  );
}

export default NoteList;
