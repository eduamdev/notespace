import { openDB, IDBPDatabase } from "idb";
import {
  DATABASE_NAME,
  DATABASE_VERSION,
  NOTEBOOKS_STORE,
  NOTES_STORE,
  SESSION_STORE,
  TAGS_STORE,
  TOPICS_STORE,
  USERS_STORE,
} from "@/utils/constants";

let db: IDBPDatabase | null = null;

const initDB = async (): Promise<void> => {
  if (!db) {
    db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(USERS_STORE)) {
          database.createObjectStore(USERS_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(SESSION_STORE)) {
          database.createObjectStore(SESSION_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(NOTES_STORE)) {
          database.createObjectStore(NOTES_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(NOTEBOOKS_STORE)) {
          database.createObjectStore(NOTEBOOKS_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(TAGS_STORE)) {
          database.createObjectStore(TAGS_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(TOPICS_STORE)) {
          database.createObjectStore(TOPICS_STORE, { keyPath: "id" });
        }
      },
    });
  }
};

const addItem = async <T>(storeName: string, item: T): Promise<void> => {
  if (!db) {
    throw new Error("Database is not initialized");
  }
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.put(item);
  await tx.done;
};

const getItem = async <T>(
  storeName: string,
  key: string
): Promise<T | undefined> => {
  if (!db) {
    throw new Error("Database is not initialized");
  }
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const item = await store.get(key);
  await tx.done;
  return item;
};

const getAllItems = async <T>(storeName: string): Promise<T[]> => {
  if (!db) {
    throw new Error("Database is not initialized");
  }
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const items = await store.getAll();
  await tx.done;
  return items;
};

const deleteItem = async (storeName: string, key: string): Promise<void> => {
  if (!db) {
    throw new Error("Database is not initialized");
  }
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.delete(key);
  await tx.done;
};

export { initDB, addItem, getItem, getAllItems, deleteItem };
