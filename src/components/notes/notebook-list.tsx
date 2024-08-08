import { Link } from "wouter";
import { useNotebooks } from "@/hooks/use-notebooks";
import { useNotes } from "@/hooks/use-notes";
import ItemList from "@/components/notes/item-list";
import NotebookForm from "@/components/notes/notebook-form";
import { filterNotebooks, getNoteCountForNotebook } from "@/lib/notes";
import { ListView } from "./list-view";
import { Button } from "../ui/button";
import ResponsiveModal from "../ui/responsive-modal";
import { PlusIcon } from "../icons/plus-icon";
import SearchInput from "../ui/search-input";
import { useMemo, useState } from "react";
import { AlertSquareIcon } from "../icons/alert-square-icon";
import { Skeleton } from "../ui/skeleton";

const NotebookList = () => {
  const { items: notebooks, isLoading, error } = useNotebooks();
  const { items: notes } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredNotebooks = useMemo(
    () => filterNotebooks(notebooks, searchQuery),
    [notebooks, searchQuery]
  );

  return (
    <ListView
      header={
        <>
          <div className="h-[72px]">
            <div className="p-4 lg:px-6">
              <div className="flex h-full items-center justify-between ">
                <h1 className="text-lg font-semibold text-black">Notebooks</h1>
                <ResponsiveModal
                  open={isModalOpen}
                  onOpenChange={setIsModalOpen}
                  trigger={
                    <Button>
                      <PlusIcon className="mr-2 size-[18px] shrink-0" />
                      New Notebook
                    </Button>
                  }
                  title={"Create Notebook"}
                  description="Organize your ideas by creating a new notebook. Give your notebook a meaningful name to easily categorize and access your notes later."
                >
                  <NotebookForm
                    onSuccess={() => {
                      setIsModalOpen(false);
                    }}
                  />
                </ResponsiveModal>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 lg:px-6">
            <SearchInput
              placeholder={`Search notebooks...`}
              value={searchQuery}
              onChange={setSearchQuery}
              ariaLabel={`Search notebooks...`}
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
                  className="grid grid-cols-1 items-start justify-center gap-3 py-4"
                >
                  <Skeleton className="mt-0.5 h-[14px] w-2/5" />
                  <Skeleton className="h-[11px] w-1/5" />
                </div>
              ))}
            </div>
          ) : searchQuery && !filteredNotebooks.length ? (
            <p className="px-4 py-2 font-serif tracking-wide text-neutral-600 lg:px-6">
              No results found. Adjust your search and try again.
            </p>
          ) : !searchQuery && !filteredNotebooks.length ? (
            <p className="px-4 py-2 font-serif tracking-wide text-neutral-600 lg:px-6">
              You haven&apos;t created any notebooks yet. Add your first
              notebook.
            </p>
          ) : (
            <ItemList
              items={filteredNotebooks}
              renderItem={(notebook) => {
                const noteCount = getNoteCountForNotebook(notebook, notes);

                return (
                  <Link
                    href={`/notebooks/${notebook.id}`}
                    className="grid w-full grid-cols-1 justify-center px-4 py-1 hover:bg-neutral-50 lg:px-6"
                  >
                    <p className="truncate font-semibold text-black">
                      {notebook.name}
                    </p>
                    <p className="truncate text-[13px] leading-7 text-neutral-500">
                      {noteCount} {noteCount === 1 ? "note" : "notes"}
                    </p>
                  </Link>
                );
              }}
            />
          )}
        </div>
      }
    />
  );
};

export default NotebookList;
