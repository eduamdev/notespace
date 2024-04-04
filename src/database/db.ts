import { Note } from "@/types/note";
import localforage from "localforage";

const noteStorage = localforage.createInstance({
  name: "note_storage",
});

export const addNote = async (note: Note) => {
  try {
    await noteStorage.setItem(note.id, note);
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

export const getNotes = async () => {
  try {
    const notes: Note[] = [];
    await noteStorage.iterate<Note, undefined>((value) => {
      notes.push(value);
    });
    return;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};
