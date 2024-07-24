import { Link, useLocation } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { useNotes } from "@/hooks/use-notes";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import NoteActions from "@/components/notes/note-actions";
import { StarIcon } from "@/components/icons/star-icon";
import { generateUniqueId, sortNotesByUpdatedAtDescending } from "@/lib/utils";
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
            <div className="group/item relative">
              <Link
                to={`/notes/${note.id}/edit`}
                className="grid grid-cols-1 items-start justify-center gap-4 px-4 hover:bg-neutral-50 lg:px-6"
              >
                <div className="relative block w-full overflow-hidden py-1">
                  <p className="truncate font-semibold leading-6 text-black">
                    {note.title}
                  </p>
                  <p className="line-clamp-2 text-[15px] text-neutral-600">
                    {note.contentText}
                  </p>
                  <p className="flex items-center justify-start gap-x-3 truncate text-[13px] leading-7 text-neutral-500">
                    <span>
                      {formatDistanceToNow(new Date(note.updatedAt), {
                        addSuffix: true,
                      })}
                    </span>
                    {note.isFavorite && (
                      <StarIcon className="size-[13px] shrink-0 text-neutral-600" />
                    )}
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
      onCreateItemButtonClick={() => {
        navigate(`/notes/${generateUniqueId()}/create`);
      }}
      filterItems={filterNotes}
    />
  );
}
