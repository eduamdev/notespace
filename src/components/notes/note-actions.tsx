import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StarFilledIcon } from "@/components/icons/star-filled-icon";
import { StarIcon } from "@/components/icons/star-icon";
import { TrashIcon } from "@/components/icons/trash-icon";
import { Note } from "@/models/note";

interface NoteActionsProps {
  note: Note;
  onFavoriteClick: (note: Note) => void;
  onDeleteClick: (noteId: string) => void;
}

export default function NoteActions({
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
              <StarFilledIcon className="size-[18px] shrink-0 text-yellow-400 transition-opacity group-hover/favorite:opacity-80" />
            ) : (
              <StarIcon className="size-[18px] shrink-0 text-neutral-700 transition-colors group-hover/favorite:text-yellow-500" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={24}
          collisionPadding={{ top: 20, bottom: 20, left: 20 }}
        >
          <p>
            {note.isFavorite
              ? "Unmark note as favorite"
              : "Mark note as favorite"}
          </p>
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
