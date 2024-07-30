import { useState } from "react";
import { Link, useParams } from "wouter";
import { toast } from "sonner";
import { useNotebooks } from "@/hooks/use-notebooks";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { ChevronLeftIcon } from "@/components/icons/chevron-left-icon";

const NotebookManager = () => {
  const { notebookId } = useParams<{ notebookId: string }>();
  const { singleItem: notebook, error } = useNotebooks(notebookId);
  const [searchQuery, setSearchQuery] = useState("");

  if (error) {
    toast.error("Error loading notebook data");
    console.error(
      `Error fetching notebook (notebook id: ${notebookId}):`,
      error
    );
  }

  return (
    <>
      <div className="flex h-[68px] items-center justify-between p-4 lg:px-6">
        <Link
          href="/notebooks"
          className="-ml-1.5 flex h-9 items-center justify-center gap-1 pr-2.5 align-middle text-neutral-700"
        >
          <ChevronLeftIcon className="size-4 shrink-0" />
          <span className="text-[15px] leading-none">Back</span>
        </Link>
        <button className="flex h-9 items-center justify-center rounded-lg bg-neutral-900 pl-1.5 pr-2.5 text-neutral-50">
          <PlusIcon className="inline-block size-4" />
          <span className="pl-1.5 text-sm font-medium">New Note</span>
        </button>
      </div>
      <div></div>
      <div className="px-4 py-2 lg:px-6">
        <div className="grid h-10 w-full grid-cols-[auto_50px]">
          <h1 className="text-lg font-semibold">{notebook?.name}</h1>
          <div>edit</div>
        </div>
      </div>
      <div className="px-4 py-2 lg:px-6">
        <button className="grid h-10 w-full grid-cols-[18px_1fr] items-center justify-center gap-x-3 rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08]">
          <SearchIcon className="size-[18px] text-neutral-600" />
          <input
            type="text"
            placeholder={`Search Notes...`}
            className="outline-none placeholder:text-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </button>
      </div>
      <div className="py-4">
        <div className="px-4 py-2 lg:px-6">list or something</div>
      </div>
    </>
  );
};

export default NotebookManager;
