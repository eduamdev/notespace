import { Link } from "wouter";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { useNotes } from "@/hooks/use-notes";

function NoteList() {
  const { notes } = useNotes();

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-lg font-semibold text-black">Notes</h1>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/notes/new"
            className="flex h-9 items-center justify-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50"
          >
            <PlusIcon className="inline-block size-4" />
            <span className="pl-1.5 text-sm font-medium">Note</span>
          </Link>
        </div>
      </div>
      <div className="py-2">
        <button className="grid h-10 w-full grid-cols-[18px_1fr] items-center justify-center gap-x-3 rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08]">
          <SearchIcon className="size-[18px] text-neutral-600" />
          <input
            type="text"
            placeholder="Search note..."
            className="outline-none"
          />
        </button>
      </div>
      <ul className="divide-y py-4">
        {notes?.map((note) => (
          <li key={note.id} className="py-2">
            <Link to={`/notes/${note.id}`} className="block w-full">
              <p className="truncate text-[15px] font-medium text-black">
                {note.title}
              </p>
              <p className="line-clamp-2 text-[15px]">{note.content}</p>
              <p className="truncate text-[13px] text-neutral-500">Now</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NoteList;
