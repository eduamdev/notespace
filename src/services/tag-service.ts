import {
  initDB,
  createItem,
  updateItem,
  getAllItems,
  deleteItem,
} from "@/services/idb-service";
import { STORE_NAMES } from "@/lib/constants";
import { Tag } from "@/models/tag";

export const createTag = async (tag: Tag) => {
  await initDB();
  await createItem(STORE_NAMES.TAGS, tag);
};

export const getTags = async () => {
  await initDB();
  return await getAllItems<Tag>(STORE_NAMES.TAGS);
};

export const updateTag = async (tag: Tag) => {
  await initDB();
  await updateItem(STORE_NAMES.TAGS, tag);
};

export const deleteTag = async (id: string) => {
  await initDB();
  await deleteItem(STORE_NAMES.TAGS, id);
};
