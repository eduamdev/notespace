import {
  initDB,
  createItem,
  updateItem,
  getAllItems,
  deleteItem,
  getItem,
} from "@/services/idb-service";
import { STORE_NAMES } from "@/lib/constants";
import { Tag } from "@/models/tag";

export const getTagById = async (tagId: string) => {
  await initDB();
  const tag = await getItem<Tag>(STORE_NAMES.TAGS, tagId);

  if (!tag) {
    throw new Error("Tag not found");
  }
  return tag;
};

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
