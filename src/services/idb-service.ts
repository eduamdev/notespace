import { openDB, IDBPDatabase } from "idb";
import { DATABASE_NAME, DATABASE_VERSION, STORE_NAMES } from "@/lib/constants";

let db: IDBPDatabase | null = null;

export const initDB = async (): Promise<void> => {
  if (!db) {
    db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAMES.USERS)) {
          db.createObjectStore(STORE_NAMES.USERS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORE_NAMES.SESSION)) {
          db.createObjectStore(STORE_NAMES.SESSION, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORE_NAMES.NOTES)) {
          const noteStore = db.createObjectStore(STORE_NAMES.NOTES, {
            keyPath: "id",
          });
          noteStore.createIndex("byNotebook", "notebookId");
        }
        if (!db.objectStoreNames.contains(STORE_NAMES.NOTEBOOKS)) {
          db.createObjectStore(STORE_NAMES.NOTEBOOKS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORE_NAMES.TAGS)) {
          db.createObjectStore(STORE_NAMES.TAGS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORE_NAMES.TOPICS)) {
          db.createObjectStore(STORE_NAMES.TOPICS, { keyPath: "id" });
        }
      },
    });
  }
};

export const addItem = async <T>(storeName: string, item: T): Promise<void> => {
  if (!db) throw new Error("DB is not initialized");
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.add(item);
  await tx.done;
};

export const getAllItems = async <T>(storeName: string): Promise<T[]> => {
  if (!db) throw new Error("DB is not initialized");
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const items = await store.getAll();
  await tx.done;
  return items;
};

export const getItem = async <T>(
  storeName: string,
  key: string
): Promise<T | undefined> => {
  if (!db) throw new Error("DB is not initialized");
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const item = await store.get(key);
  await tx.done;
  return item;
};

export const updateItem = async <T>(
  storeName: string,
  item: T
): Promise<void> => {
  if (!db) throw new Error("DB is not initialized");
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.put(item);
  await tx.done;
};

export const deleteItem = async (
  storeName: string,
  key: string
): Promise<void> => {
  if (!db) throw new Error("DB is not initialized");
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.delete(key);
  await tx.done;
};
