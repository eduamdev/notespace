import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useNotebooks } from "@/hooks/use-notebooks";
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
  filterNotesByNotebookId,
  sortNotesByUpdatedAtDescending,
} from "@/lib/notes";
import { generateUniqueId } from "@/lib/utils";
import { Note } from "@/models/note";
import ResponsiveModal from "../ui/responsive-modal";
import NotebookForm from "./notebook-form";
import { ListView } from "./list-view";
import { NotebookIcon } from "../icons/notebook-icon";

const NotebookDetails = () => {
  const { notebookId } = useParams<{ notebookId: string }>();
  const { singleItem: notebook, error } = useNotebooks(notebookId);
  const {
    items: notes,
    updateItem: updateNote,
    deleteItem: deleteNote,
    isLoading,
  } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (error) {
    toast.error("Error loading notebook data");
    console.error(
      `Error fetching notebook (notebook id: ${notebookId}):`,
      error
    );
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
    () => filterNotesByNotebookId(notes, notebookId, searchQuery),
    [notebookId, notes, searchQuery]
  );

  return (
    <ListView
      header={
        <>
          <div className="h-[72px]">
            <div className="flex items-center justify-between p-4 lg:px-6">
              <Link
                href="/notebooks"
                className="-ml-1.5 flex h-9 items-center justify-center gap-1 pr-2.5 align-middle text-neutral-700"
              >
                <ChevronLeftIcon className="size-4 shrink-0" />
                <span className="text-sm leading-none">Back</span>
              </Link>
              <Button asChild>
                <Link
                  href={`/notebooks/${notebookId}/notes/${generateUniqueId()}/create`}
                >
                  <PlusIcon className="mr-2 size-[18px] shrink-0" />
                  New Note
                </Link>
              </Button>
            </div>
          </div>

          <div className="p-4 lg:px-6">
            <div className="line-clamp-1 grid h-10 w-full grid-cols-[1fr_auto] items-center gap-x-2">
              <div className="flex items-center justify-start gap-x-1.5 truncate">
                <NotebookIcon className="size-[18px] shrink-0 text-neutral-600" />
                <h1 className="truncate text-lg font-semibold">
                  {notebook?.name}
                </h1>
              </div>
              <ResponsiveModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                trigger={
                  <Button size={"icon"} variant={"ghost"}>
                    <EditIcon className="h-4 shrink-0 text-neutral-700" />
                  </Button>
                }
                title={"Edit Notebook"}
                description="Update your notebook's name to better reflect its contents and purpose."
              >
                <NotebookForm
                  notebook={notebook}
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
          <div className="px-4 lg:px-6">
            {isLoading && <p className="py-2">Loading...</p>}
            {error && <p className="py-2">Error: {error.message}</p>}
            {searchQuery && !filteredNotes.length && (
              <p className="py-2 font-serif tracking-wide text-neutral-600">
                No results found. Adjust your search and try again.
              </p>
            )}
            {!searchQuery && !filteredNotes.length && (
              <p className="py-2 font-serif tracking-wide text-neutral-600">
                This notebook doesn&apos;t have any notes yet. Start adding
                notes to capture your thoughts and ideas.
              </p>
            )}
          </div>
          <ItemList
            items={filteredNotes}
            renderItem={(note) => (
              <div className="group/item relative">
                <Link
                  to={`/notebooks/${notebookId}/notes/${note.id}/edit`}
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
        </div>
      }
    />
  );
};

export default NotebookDetails;
