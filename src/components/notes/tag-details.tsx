import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useTags } from "@/hooks/use-tags";
import { useNotes } from "@/hooks/use-notes";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search-input";
import ItemList from "@/components/notes/item-list";
import NoteActions from "@/components/notes/note-actions";
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
import { ListView } from "./list-view";
import ResponsiveModal from "../ui/responsive-modal";
import TagForm from "./tag-form";
import { HashIcon } from "../icons/hash-icon";
import { AlertSquareIcon } from "../icons/alert-square-icon";
import { Skeleton } from "../ui/skeleton";

const TagDetails = () => {
  const { tagId } = useParams<{ tagId: string }>();
  const { singleItem: tag, error: tagError } = useTags(tagId);
  const {
    items: notes,
    updateItem: updateNote,
    deleteItem: deleteNote,
    isLoading,
    error,
  } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (tagError) {
    toast.error("Error loading tag data");
    console.error(`Error fetching tag (tag id: ${tagId}):`, tagError);
  }

  const handleFavoriteClick = (note: Note) => {
    updateNote({
      ...note,
      isFavorite: !note.isFavorite,
    });
  };

  const handleDeleteClick = (noteId: string) => {
    deleteNote(noteId);
  };

  const filteredNotes = useMemo(
    () => filterNotesByTagId(notes, tagId, searchQuery),
    [tagId, notes, searchQuery]
  );

  return (
    <ListView
      header={
        <>
          <div className="h-[72px]">
            <div className="flex items-center justify-between p-4 lg:px-6">
              <Link
                href="/tags"
                className="-ml-1.5 flex h-9 items-center justify-center gap-1 pr-2.5 align-middle text-neutral-700"
              >
                <ChevronLeftIcon className="size-4 shrink-0" />
                <span className="text-sm leading-none">Back</span>
              </Link>
              <Button asChild>
                <Link
                  href={`/tags/${tagId}/notes/${generateUniqueId()}/create`}
                >
                  <PlusIcon className="mr-2 size-[18px] shrink-0" />
                  New Note
                </Link>
              </Button>
            </div>
          </div>

          <div className="p-4 lg:px-6">
            <div className="line-clamp-1 grid h-10 w-full grid-cols-[1fr_auto] items-center gap-x-2">
              <div className="flex items-center justify-start gap-x-1 truncate">
                <HashIcon className="size-[18px] shrink-0 text-neutral-600" />
                <h1 className="truncate text-lg font-semibold">{tag?.name}</h1>
              </div>
              <ResponsiveModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                trigger={
                  <Button size={"icon"} variant={"ghost"}>
                    <EditIcon className="h-4 shrink-0 text-neutral-700" />
                  </Button>
                }
                title={"Edit Tag"}
                description="Update the name of your tag to better reflect the content it organizes."
              >
                <TagForm
                  tag={tag}
                  onSuccess={() => {
                    setIsModalOpen(false);
                  }}
                />
              </ResponsiveModal>
            </div>
          </div>

          <div className="px-4 py-2 lg:px-6">
            <SearchInput
              placeholder={`Search notes...`}
              value={searchQuery}
              onChange={setSearchQuery}
              ariaLabel={`Search notes...`}
            />
          </div>
        </>
      }
      body={
        <div className="py-4">
          {error ? (
            <p className="grid grid-cols-[auto_1fr] items-start gap-x-3 bg-red-50/50 px-4 py-3.5 text-sm font-medium text-red-500 lg:px-6">
              <AlertSquareIcon className="size-4 shrink-0" />
              <span className="font-semibold">Error: {error.message}</span>
            </p>
          ) : isLoading ? (
            <div className="divide-y px-4 lg:px-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="grid grid-cols-1 items-start justify-center gap-2 py-5"
                >
                  <Skeleton className="h-[13px] w-1/3" />
                  <Skeleton className="mt-0.5 h-[22px] w-full" />
                </div>
              ))}
            </div>
          ) : searchQuery && !filteredNotes.length ? (
            <p className="px-4 py-2 font-serif tracking-wide text-neutral-600 lg:px-6">
              No results found. Adjust your search and try again.
            </p>
          ) : !searchQuery && !filteredNotes.length ? (
            <p className="px-4 py-2 font-serif tracking-wide text-neutral-600 lg:px-6">
              There are no notes associated with this tag yet. Start adding
              notes to organize your content under this tag.
            </p>
          ) : (
            <ItemList
              items={filteredNotes}
              renderItem={(note) => (
                <div className="group/item relative">
                  <Link
                    to={`/tags/${tagId}/notes/${note.id}/edit`}
                    className="grid  grid-cols-1 items-start justify-center gap-4 px-4 hover:bg-neutral-50 lg:px-6"
                  >
                    <div className="relative block w-full overflow-hidden py-1">
                      {note.title ? (
                        <p className="truncate font-semibold text-black">
                          {note.title}
                        </p>
                      ) : (
                        <p className="truncate font-serif">[Untitled Note]</p>
                      )}
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
        </div>
      }
    />
  );
};

export default TagDetails;
