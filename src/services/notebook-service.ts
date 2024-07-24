import {
  initDB,
  createItem,
  updateItem,
  getAllItems,
  deleteItem,
} from "@/services/idb-service";
import { STORE_NAMES } from "@/lib/constants";
import { Notebook } from "@/models/notebook";

export const createNotebook = async (notebook: Notebook) => {
  await initDB();
  await createItem(STORE_NAMES.NOTEBOOKS, notebook);
};

export const getNotebooks = async () => {
  await initDB();
  return await getAllItems<Notebook>(STORE_NAMES.NOTEBOOKS);
};

export const updateNotebook = async (note: Notebook) => {
  await initDB();
  await updateItem(STORE_NAMES.NOTEBOOKS, note);
};

export const deleteNotebook = async (id: string) => {
  await initDB();
  await deleteItem(STORE_NAMES.NOTEBOOKS, id);
};
