import { Link } from "wouter";
import { useTags } from "@/hooks/use-tags";
import { useNotes } from "@/hooks/use-notes";
import ItemList from "@/components/notes/item-list";
import TagForm from "@/components/notes/tag-form";
import { HashIcon } from "@/components/icons/hash-icon";
import { filterTags, getNoteCountForTag } from "@/lib/notes";
import { ListView } from "./list-view";
import ResponsiveModal from "../ui/responsive-modal";
import { Button } from "../ui/button";
import { PlusIcon } from "../icons/plus-icon";
import SearchInput from "../ui/search-input";
import { useMemo, useState } from "react";
import { AlertSquareIcon } from "../icons/alert-square-icon";
import { Skeleton } from "../ui/skeleton";

const TagList = () => {
  const { items: tags, isLoading, error } = useTags();
  const { items: notes } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTags = useMemo(
    () => filterTags(tags, searchQuery),
    [searchQuery, tags]
  );

  return (
    <ListView
      header={
        <>
          <div className="h-[72px]">
            <div className="p-4 lg:px-6">
              <div className="flex h-full items-center justify-between ">
                <h1 className="text-lg font-semibold text-black">Tags</h1>
                <ResponsiveModal
                  open={isModalOpen}
                  onOpenChange={setIsModalOpen}
                  trigger={
                    <Button>
                      <PlusIcon className="mr-2 size-[18px] shrink-0" />
                      New Tag
                    </Button>
                  }
                  title={"Create Tag"}
                  description="Enhance your note organization by creating a new tag. Choose a tag name that will help you quickly find and group related notes."
                >
                  <TagForm
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
              placeholder={`Search tags...`}
              value={searchQuery}
              onChange={setSearchQuery}
              ariaLabel={`Search tags...`}
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
                  className="flex items-center justify-between gap-2 py-5"
                >
                  <Skeleton className="h-[13px] w-1/2" />
                  <Skeleton className="h-[13px] w-8" />
                </div>
              ))}
            </div>
          ) : searchQuery && !filteredTags.length ? (
            <p className="px-4 py-2 font-serif tracking-wide text-neutral-600 lg:px-6">
              No results found. Adjust your search and try again.
            </p>
          ) : !searchQuery && !filteredTags.length ? (
            <p className="px-4 py-2 font-serif tracking-wide text-neutral-600 lg:px-6">
              You haven&apos;t created any tags yet. Add your first tag.
            </p>
          ) : (
            <ItemList
              items={filteredTags}
              renderItem={(tag) => (
                <Link
                  href={`/tags/${tag.id}`}
                  className="grid w-full grid-cols-[1fr_auto] gap-x-4 px-4 py-1 hover:bg-neutral-50 lg:px-6"
                >
                  <p className="truncate">
                    <HashIcon className="mr-0.5 inline size-4 shrink-0" />
                    <span className="font-semibold">{tag.name}</span>
                  </p>
                  <p className="truncate text-[13px] leading-7 text-neutral-500">
                    {getNoteCountForTag(tag, notes)}
                  </p>
                </Link>
              )}
            />
          )}
        </div>
      }
    />
  );
};

export default TagList;
