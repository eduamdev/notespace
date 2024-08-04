import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useTags } from "@/hooks/use-tags";
import { useNotes } from "@/hooks/use-notes";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search-input";
import ItemList from "@/components/item-list";
import NoteActions from "@/components/notes/note-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusIcon } from "@/components/icons/plus-icon";
import { ChevronLeftIcon } from "@/components/icons/chevron-left-icon";
import { EditIcon } from "@/components/icons/edit-icon";
import { StarIcon } from "@/components/icons/star-icon";
import {
  filterNotesByTagId,
  sortNotesByUpdatedAtDescending,
} from "@/lib/notes";
import { generateUniqueId } from "@/lib/utils";
import { Note } from "@/models/note";

const TagManager = () => {
  const { tagId } = useParams<{ tagId: string }>();
  const { singleItem: tag, error } = useTags(tagId);
  const { items: notes, updateItem, deleteItem } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");

  if (error) {
    toast.error("Error loading tag data");
    console.error(`Error fetching tag (tag id: ${tagId}):`, error);
  }

  const handleFavoriteClick = (note: Note) => {
    updateItem({
      ...note,
      isFavorite: !note.isFavorite,
    });
  };

  const handleDeleteClick = (noteId: string) => {
    deleteItem(noteId);
  };

  const filteredNotes = useMemo(
    () => filterNotesByTagId(notes, tagId, searchQuery),
    [tagId, notes, searchQuery]
  );

  return (
    <>
      <div className="flex h-[70px] items-center justify-between p-4 lg:px-6">
        <Link
          href="/tags"
          className="-ml-1.5 flex h-9 items-center justify-center gap-1 pr-2.5 align-middle text-neutral-700"
        >
          <ChevronLeftIcon className="size-4 shrink-0" />
          <span className="text-sm leading-none">Back</span>
        </Link>
        <Link
          href={`/tags/${tagId}/notes/${generateUniqueId()}/create`}
          className="flex h-[38px] items-center justify-center gap-x-2 rounded-lg bg-neutral-900 pl-2.5 pr-3.5 text-neutral-50"
        >
          <PlusIcon className="size-[18px] shrink-0" />
          <span className="text-sm font-medium">New Note</span>
        </Link>
      </div>
      <div className="px-4 py-2 lg:px-6">
        <div className="line-clamp-1 grid h-10 w-full grid-cols-[1fr_auto] items-center gap-x-2">
          <h1 className="truncate text-lg font-semibold">{tag?.name}</h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <EditIcon className="h-[18px] shrink-0 text-neutral-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={24}
              collisionPadding={{ top: 20, bottom: 20, left: 20 }}
            >
              <p>Edit Tag</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="px-4 py-2 lg:px-6">
        <SearchInput
          placeholder="Search notes..."
          value={searchQuery}
          onChange={setSearchQuery}
          ariaLabel="Search notes"
        />
      </div>
      <div className="py-4">
        <ItemList
          items={filteredNotes}
          renderItem={(note) => (
            <div className="group/item relative">
              <Link
                to={`/tags/${tagId}/notes/${note.id}/edit`}
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
      </div>
    </>
  );
};

export default TagManager;
