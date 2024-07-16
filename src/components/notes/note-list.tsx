import { Link, useLocation } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { useNotes } from "@/hooks/use-notes";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import NoteActions from "@/components/notes/note-actions";
import { Note } from "@/models/note";

const filterNotes = (notes: Note[], query: string) => {
  if (!query) return notes;
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.contentText.toLowerCase().includes(query.toLowerCase())
  );
};

export default function NoteList() {
  const [, navigate] = useLocation();
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
      title="Notes"
      description="Add a new note with a title and content."
      itemName="Note"
      useItemsHook={useNotes}
      ListComponent={({ items: notes }) => (
        <ItemList
          items={notes}
          renderItem={(note) => (
            <div className="group/item grid grid-cols-[1fr_auto] items-start justify-center gap-4 px-4 hover:bg-neutral-50 lg:px-6">
              <Link
                to={`/notes/${note.id}`}
                className="relative block w-full overflow-hidden py-1"
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
                <div className="absolute inset-y-0 right-0 h-full w-8 bg-gradient-to-l from-white group-hover/item:from-neutral-50"></div>
              </Link>
              <NoteActions
                note={note}
                onFavoriteClick={handleFavoriteClick}
                onDeleteClick={handleDeleteClick}
              />
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
