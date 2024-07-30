import { ButtonHTMLAttributes, forwardRef } from "react";
import { Link, useLocation } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { useNotes } from "@/hooks/use-notes";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import NoteActions from "@/components/notes/note-actions";
import { StarIcon } from "@/components/icons/star-icon";
import { PlusIcon } from "@/components/icons/plus-icon";
import { filterNotes, sortNotesByUpdatedAtDescending } from "@/lib/notes";
import { generateUniqueId } from "@/lib/utils";
import { Note } from "@/models/note";

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

  const AddNoteButton = forwardRef<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
  >((props, ref) => (
    <button
      ref={ref}
      className="flex h-9 items-center justify-center rounded-lg bg-neutral-900 pl-1.5 pr-2.5 text-neutral-50"
      {...props}
    >
      <PlusIcon className="inline-block size-4" />
      <span className="pl-1.5 text-sm font-medium">New Note</span>
    </button>
  ));

  AddNoteButton.displayName = "AddNoteButton";

  return (
    <ListManager<Note>
      title="Notes"
      itemName="Note"
      headerAction={
        <AddNoteButton
          onClick={() => {
            navigate(`/notes/${generateUniqueId()}/create`);
          }}
        />
      }
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
      filterItems={filterNotes}
    />
  );
}
