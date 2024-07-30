import {
  initDB,
  createItem,
  updateItem,
  getAllItems,
  deleteItem,
  getItem,
} from "@/services/idb-service";
import { STORE_NAMES } from "@/lib/constants";
import { Notebook } from "@/models/notebook";

export const getNotebookById = async (notebookId: string) => {
  await initDB();
  const notebook = await getItem<Notebook>(STORE_NAMES.NOTEBOOKS, notebookId);

  if (!notebook) {
    throw new Error("Notebook not found");
  }
  return notebook;
};

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
