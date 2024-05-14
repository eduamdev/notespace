import { useEffect, useState } from "react";
import { Link } from "wouter";

import { SearchIcon } from "@/components/icons/search-icon";
import { getNotes } from "@/services/note-service";
import { Note } from "@/types";

function FavoriteList() {
  const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([]);

  useEffect(() => {
    void fetchFavoriteNotes();
  }, []);

  const fetchFavoriteNotes = async () => {
    try {
      console.log("fetching favorite notes...");
      const fetchedFavoriteNotes = await getNotes();
      setFavoriteNotes(fetchedFavoriteNotes);
    } catch (error) {
      console.error("Error fetching favorite notes:", error);
    }
  };

  return (
    <div className="relative size-full after:absolute after:right-0 after:top-0 after:h-full after:w-px after:border-r after:border-neutral-950/10 after:content-['']">
      <div className="flex h-[68px] items-center justify-between px-6 py-4">
        <h1 className="text-lg font-semibold text-black">Favorites</h1>
      </div>
      <div className="px-6 py-2">
        <button className="grid h-10 w-full grid-cols-[18px_1fr] items-center justify-center gap-x-3 rounded-md border border-black/[0.12] px-3 shadow-sm shadow-black/[0.08]">
          <SearchIcon className="size-[18px] text-neutral-600" />
          <input
            type="text"
            placeholder="Search favorite notes..."
            className="outline-none"
          />
        </button>
      </div>
      <ul className="divide-y py-4">
        {favoriteNotes.map((note) => (
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

export default FavoriteList;
