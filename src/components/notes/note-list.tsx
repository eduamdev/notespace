import { Link, useLocation } from "wouter";
import { useNotes } from "@/hooks/use-notes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import ItemList from "@/components/item-list";
import ListManager from "@/components/list-manager";
import { HeartIcon } from "@/components/icons/heart-icon";
import { HeartFilledIcon } from "@/components/icons/heart-filled-icon";
import { TrashIcon } from "@/components/icons/trash-icon";
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
      addItemText="Note"
      filterItems={filterNotes}
    />
  );
}

interface NoteActionsProps {
  note: Note;
  onFavoriteClick: (note: Note) => void;
  onDeleteClick: (noteId: string) => void;
}

function NoteActions({
  note,
  onFavoriteClick,
  onDeleteClick,
}: NoteActionsProps) {
  return (
    <div className="z-10 mt-1 flex flex-row items-center justify-center gap-2 rounded-full border border-transparent bg-white px-1 group-hover/item:border-neutral-950/5">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="group/favorite z-20 p-2"
            onClick={() => {
              onFavoriteClick(note);
            }}
          >
            {note.isFavorite ? (
              <HeartFilledIcon className="size-[18px] shrink-0 text-red-400 transition-opacity group-hover/favorite:opacity-80" />
            ) : (
              <HeartIcon className="size-[18px] shrink-0 text-neutral-700 transition-colors group-hover/favorite:text-red-400" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={24}
          collisionPadding={{ top: 20, bottom: 20, left: 20 }}
        >
          <p>{note.isFavorite ? "Unmark as favorite" : "Mark as favorite"}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="group/delete z-20 p-2"
            onClick={() => {
              onDeleteClick(note.id);
            }}
          >
            <TrashIcon className="size-[18px] shrink-0 text-neutral-700 transition-colors group-hover/delete:text-red-400" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={24}
          collisionPadding={{ top: 20, bottom: 20, left: 20 }}
        >
          <p>Delete note</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
