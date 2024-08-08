import { Link, useLocation } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { useNotes } from "@/hooks/use-notes";
import { useTags } from "@/hooks/use-tags";
import { Button } from "@/components/ui/button";
import ItemList from "@/components/notes/item-list";
import NoteActions from "@/components/notes/note-actions";
import { ClockIcon } from "@/components/icons/clock-icon";
import { StarIcon } from "@/components/icons/star-icon";
import { PlusIcon } from "@/components/icons/plus-icon";
import { HashIcon } from "@/components/icons/hash-icon";
import { filterNotes, sortNotesByUpdatedAtDescending } from "@/lib/notes";
import { generateUniqueId } from "@/lib/utils";
import { Note } from "@/models/note";
import { ListView } from "./list-view";
import SearchInput from "../ui/search-input";
import { useMemo, useState } from "react";
import { AlertSquareIcon } from "../icons/alert-square-icon";
import { Skeleton } from "../ui/skeleton";

export default function NoteList() {
  const [, navigate] = useLocation();
  const { items: notes, error, isLoading, updateItem, deleteItem } = useNotes();
  const { items: tags } = useTags();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = useMemo(
    () => filterNotes(notes, searchQuery),
    [notes, searchQuery]
  );

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
    <ListView
      header={
        <>
          <div className="h-[72px]">
            <div className="p-4 lg:px-6">
              <div className="flex h-full items-center justify-between ">
                <h1 className="text-lg font-semibold text-black">Notes</h1>
                <Button
                  onClick={() => {
                    navigate(`/notes/${generateUniqueId()}/create`);
                  }}
                >
                  <PlusIcon className="mr-2 size-[18px] shrink-0" />
                  New Note
                </Button>
              </div>
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
              You haven&apos;t created any notes yet. Add your first note.
            </p>
          ) : (
            <ItemList
              items={filteredNotes}
              renderItem={(note) => (
                <div className="group/item relative">
                  <Link
                    to={`/notes/${note.id}/edit`}
                    className="grid grid-cols-1 items-start justify-center gap-4 px-4 hover:bg-neutral-50 lg:px-6"
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
                      <p className="flex items-center justify-start gap-x-3.5 truncate text-[13px] leading-7 text-neutral-500">
                        <span className="inline-flex items-center justify-center gap-x-1">
                          <ClockIcon className="size-[13px] shrink-0" />
                          {formatDistanceToNow(new Date(note.updatedAt), {
                            addSuffix: true,
                          })}
                        </span>
                        {note.isFavorite && (
                          <StarIcon className="size-[13px] shrink-0" />
                        )}
                        <span className="inline-flex items-center justify-center gap-x-2">
                          {note.tags.map((tagId) => {
                            const tag = tags.find((tag) => tag.id === tagId);

                            if (!tag) return;
                            return (
                              <span
                                key={tagId}
                                className="inline-flex items-center justify-center"
                              >
                                <HashIcon className="size-[13px] shrink-0" />
                                {tag.name}
                              </span>
                            );
                          })}
                        </span>
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
}
