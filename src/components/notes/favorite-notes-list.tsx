import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { useNotes } from "@/hooks/use-notes";
import ItemList from "@/components/notes/item-list";
import NoteActions from "@/components/notes/note-actions";
import {
  filterFavoriteNotes,
  sortNotesByUpdatedAtDescending,
} from "@/lib/notes";
import { Note } from "@/models/note";
import { ListView } from "./list-view";
import SearchInput from "../ui/search-input";
import { useMemo, useState } from "react";
import { ClockIcon } from "../icons/clock-icon";
import { HashIcon } from "../icons/hash-icon";
import { useTags } from "@/hooks/use-tags";
import { StarIcon } from "../icons/star-icon";

function FavoriteNotesList() {
  const { items: notes, error, isLoading, updateItem, deleteItem } = useNotes();
  const { items: tags } = useTags();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFavoriteNotes = useMemo(
    () => filterFavoriteNotes(notes, searchQuery),
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
            <div className="h-full p-4 lg:px-6">
              <div className="flex h-full items-center justify-start">
                <h1 className="text-lg font-semibold text-black">Favorites</h1>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 lg:px-6">
            <SearchInput
              placeholder={`Search notes...`}
              value={searchQuery}
              onChange={setSearchQuery}
              ariaLabel={`Search favorite notes...`}
            />
          </div>
        </>
      }
      body={
        <div className="py-4">
          <div className="px-4 lg:px-6">
            {isLoading && <p className="py-2">Loading...</p>}
            {error && <p className="py-2">Error: {error.message}</p>}
            {searchQuery && !filteredFavoriteNotes.length && (
              <p className="py-2 font-serif tracking-wide text-neutral-600">
                No results found. Adjust your search and try again.
              </p>
            )}
            {!searchQuery && !filteredFavoriteNotes.length && (
              <p className="py-2 font-serif tracking-wide text-neutral-600">
                You haven&apos;t added any notes to your favorites yet. Start
                exploring and click the star icon to mark your favorite notes!
              </p>
            )}
          </div>
          <ItemList
            items={filteredFavoriteNotes}
            renderItem={(note) => (
              <div className="group/item relative">
                <Link
                  to={`/favorites/notes/${note.id}/edit`}
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
        </div>
      }
    />
  );
}

export default FavoriteNotesList;
