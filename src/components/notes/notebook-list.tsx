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
          <div className="px-4 lg:px-6">
            {isLoading && <p className="py-2">Loading...</p>}
            {error && <p className="py-2">Error: {error.message}</p>}
            {searchQuery && !filteredNotebooks.length && (
              <p className="py-2 font-serif tracking-wide text-neutral-600">
                No results found. Adjust your search and try again.
              </p>
            )}
            {!searchQuery && !filteredNotebooks.length && (
              <p className="py-2 font-serif tracking-wide text-neutral-600">
                You haven&apos;t created any notebooks yet. Add your first
                notebook
              </p>
            )}
          </div>
          <ItemList
            items={filteredNotebooks}
            renderItem={(notebook) => {
              const noteCount = getNoteCountForNotebook(notebook, notes);

              return (
                <Link href={`/notebooks/${notebook.id}`}>
                  <div className="w-full px-4 py-1 hover:bg-neutral-50 lg:px-6">
                    <p className="truncate font-semibold text-black">
                      {notebook.name}
                    </p>
                    <p className="truncate text-[13px] leading-6 text-neutral-500">
                      {noteCount} {noteCount === 1 ? "note" : "notes"}
                    </p>
                  </div>
                </Link>
              );
            }}
          />
        </div>
      }
    />
  );
};

export default NotebookList;
