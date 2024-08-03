import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
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
    <div className="absolute right-4 top-2 z-10 hidden flex-row items-center justify-center gap-1 rounded-full border border-neutral-950/[0.1] bg-white px-1 shadow-sm group-hover/item:flex">
      <Tooltip>
        <TooltipTrigger
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
      <Separator orientation="vertical" className="h-[18px]" />
      <Dialog>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger className="group/delete z-20 p-2">
              <TrashIcon className="size-[18px] shrink-0 text-neutral-700 transition-colors group-hover/delete:text-red-400" />
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent
            sideOffset={24}
            collisionPadding={{ top: 20, bottom: 20, left: 20 }}
          >
            <p>Delete note</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this note?
            </DialogTitle>
            <DialogDescription>
              This action is irreversible. Once deleted, this note will be
              permanently removed. Do you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="p-0">
            <button
              className="flex h-10 items-center justify-center rounded-lg border border-transparent bg-neutral-800 px-4 text-[15px] font-medium text-neutral-50"
              onClick={() => {
                onDeleteClick(note.id);
              }}
            >
              Yes, delete permanently
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
