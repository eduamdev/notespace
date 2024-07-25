import { Note } from "@/models/note";
import { Notebook } from "@/models/notebook";
import { Tag } from "@/models/tag";

export const sortNotesByUpdatedAtDescending = (a: Note, b: Note) =>
  b.updatedAt.getTime() - a.updatedAt.getTime();

export const filterNotes = (notes: Note[], query: string) => {
  if (!query) return notes;
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.contentText.toLowerCase().includes(query.toLowerCase())
  );
};

export const filterFavoriteNotes = (notes: Note[], query: string) => {
  if (!query) return notes.filter((note) => note.isFavorite);
  return notes
    .filter((note) => note.isFavorite)
    .filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.contentText.toLowerCase().includes(query.toLowerCase())
    );
};

export const filterNotebooks = (notebooks: Notebook[], query: string) => {
  if (!query) return notebooks;
  return notebooks.filter((notebook) =>
    notebook.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const filterTags = (tags: Tag[], query: string) => {
  if (!query) return tags;
  return tags.filter((tag) =>
    tag.name.toLowerCase().includes(query.toLowerCase())
  );
};
