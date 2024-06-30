import { Link, useLocation } from "wouter";
import { useNotes } from "@/hooks/use-notes";
import ItemList from "@/components/item-list";
import ListManager from "@/components/list-manager";
import { Note } from "@/models/note";

const filterNotes = (notes: Note[], query: string) => {
  if (!query) return notes;
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.contentText.toLowerCase().includes(query.toLowerCase())
  );
};

function NoteList() {
  const [, navigate] = useLocation();

  return (
    <ListManager<Note>
      title="Notes"
      addItemText="Note"
      useItemsHook={useNotes}
      ListComponent={({ items: notes }) => (
        <ItemList
          items={notes}
          renderItem={(note) => (
            <Link to={`/notes/${note.id}`} className="block w-full">
              <p className="truncate text-[15px] font-medium text-black">
                {note.title}
              </p>
              <p className="line-clamp-2 text-[15px]">{note.contentText}</p>
              <p className="truncate text-[13px] text-neutral-500">Now</p>
            </Link>
          )}
        />
      )}
      onAddItemClick={() => {
        navigate("/notes/new");
      }}
      filterItems={filterNotes}
    />
  );
}

export default NoteList;
