import { useEffect, useState } from "react";
import { Link } from "wouter";

import { getNotes } from "@/services/note-service";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { Note } from "@/types";

function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    void fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      console.log("fetching notes...");
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div className="relative size-full after:absolute after:right-0 after:top-0 after:h-full after:w-px after:border-r after:border-neutral-950/10 after:content-['']">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-lg font-semibold text-black">Notes</h1>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/notes/new"
            className="flex h-[34px] items-center justify-center rounded-lg bg-cyan-600 pl-1.5 pr-2.5 text-cyan-50"
          >
            <PlusIcon className="inline-block size-4" />
            <span className="pl-1.5 text-sm font-medium">Note</span>
          </Link>
        </div>
      </div>
      <div className="px-6 py-2">
        <button className="grid h-10 w-full grid-cols-[18px_1fr] items-center justify-center gap-x-3 rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08]">
          <SearchIcon className="size-[18px]" />
          <input
            type="text"
            placeholder="Search note..."
            className="outline-none"
          />
        </button>
      </div>
      <ul className="divide-y py-4">
        {notes.map((note) => (
          <li key={note.id} className="py-2">
            <Link to={`/notes/${note.id}`} className="block w-full px-6">
              <p className="truncate text-[15px] font-medium text-black">
                {note.title}
              </p>
              <p className="line-clamp-2 text-[15px]">{note.content}</p>
              <p className="truncate text-[13px] text-neutral-500">Now</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
