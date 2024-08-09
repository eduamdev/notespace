import { Skeleton } from "../ui/skeleton";

export const NoteEditorSkeleton = () => {
  return (
    <div className="relative grid size-full grid-cols-1 grid-rows-[72px_90px_1fr]">
      <div className="flex items-center justify-start px-4  py-5 lg:px-6">
        <Skeleton className="h-6 w-60" />
      </div>
      <div className="border-y">
        <div className="grid grid-cols-1 items-center justify-center overflow-hidden px-4 py-6 lg:px-6">
          <div className="mx-auto inline-flex items-center justify-center gap-x-2">
            <Skeleton className="h-6 w-80" />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto px-4 lg:px-6">
        <div className="pb-16 pt-8">
          <div className="2xl:mx-auto 2xl:max-w-prose focus-visible:[&>.tiptap]:outline-none">
            <div className="flex flex-col gap-y-6">
              <Skeleton className="h-4 w-80" />
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
