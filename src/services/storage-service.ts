import { openDB, IDBPDatabase } from "idb";
import { DATABASE_NAME, DATABASE_VERSION, STORE_NAMES } from "@/lib/constants";

let db: IDBPDatabase | null = null;

const initDB = async (): Promise<void> => {
  if (!db) {
    db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(STORE_NAMES.USERS)) {
          database.createObjectStore(STORE_NAMES.USERS, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(STORE_NAMES.SESSION)) {
          database.createObjectStore(STORE_NAMES.SESSION, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(STORE_NAMES.NOTES)) {
          database.createObjectStore(STORE_NAMES.NOTES, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(STORE_NAMES.NOTEBOOKS)) {
          database.createObjectStore(STORE_NAMES.NOTEBOOKS, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(STORE_NAMES.TAGS)) {
          database.createObjectStore(STORE_NAMES.TAGS, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(STORE_NAMES.TOPICS)) {
          database.createObjectStore(STORE_NAMES.TOPICS, { keyPath: "id" });
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
