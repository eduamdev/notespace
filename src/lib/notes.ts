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

export const filterNotesByNotebookId = (
  notes: Note[],
  notebookId: string,
  query: string
) => {
  return notes.filter((note) => {
    const matchesNotebookId = !notebookId || note.notebookId === notebookId;
    const matchesQuery =
      !query ||
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.contentText.toLowerCase().includes(query.toLowerCase());

    return matchesNotebookId && matchesQuery;
  });
};

export const getNoteCountForNotebook = (notebook: Notebook, notes: Note[]) => {
  return notes.filter((note) => note.notebookId === notebook.id).length;
};

export const filterNotesByTagId = (
  notes: Note[],
  tagId: string,
  query: string
) => {
  return notes.filter((note) => {
    const matchesTagId = !tagId || note.tags.includes(tagId);
    const matchesQuery =
      !query ||
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.contentText.toLowerCase().includes(query.toLowerCase());

    return matchesTagId && matchesQuery;
  });
};

export const getNoteCountForTag = (tag: Tag, notes: Note[]) => {
  return notes.filter((note) => note.tags.includes(tag.id)).length;
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
