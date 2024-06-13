import {
  initDB,
  addItem,
  updateItem,
  getItem,
  getAllItems,
  deleteItem,
} from "@/services/idb-service";
import { STORE_NAMES } from "@/lib/constants";
import { Note } from "@/models/note";

export const getNoteById = async (id: string) => {
  await initDB();
  return await getItem<Note>(STORE_NAMES.NOTES, id);
};

export const addNote = async (note: Note) => {
  await initDB();
  await addItem(STORE_NAMES.NOTES, note);
};

export const getNotes = async () => {
  await initDB();
  return await getAllItems<Note>(STORE_NAMES.NOTES);
};

export const updateNote = async (note: Note) => {
  await initDB();
  await updateItem(STORE_NAMES.NOTES, note);
};

export const deleteNote = async (id: string) => {
  await initDB();
  await deleteItem(STORE_NAMES.NOTES, id);
};
