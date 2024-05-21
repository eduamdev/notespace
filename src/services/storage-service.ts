import { openDB, IDBPDatabase } from "idb";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  notebookId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Notebook {
  id: string;
  title: string;
  topicIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Topic {
  id: string;
  title: string;
  notebookId: string;
  createdAt: Date;
  updatedAt: Date;
}

const DATABASE_NAME = "NoteGuard";
const DATABASE_VERSION = 1;

const STORE_NAMES = {
  USERS: "users",
  SESSION: "session",
  NOTES: "notes",
  NOTEBOOKS: "notebooks",
  TAGS: "tags",
  TOPICS: "topics",
};

let db: IDBPDatabase;

const initDB = async () => {
  db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAMES.USERS)) {
        db.createObjectStore(STORE_NAMES.USERS, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_NAMES.SESSION)) {
        db.createObjectStore(STORE_NAMES.SESSION, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_NAMES.NOTES)) {
        db.createObjectStore(STORE_NAMES.NOTES, { keyPath: "id" });
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
};

const addItem = async (storeName: string, item: unknown) => {
  if (!db) await initDB();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.put(item);
  await tx.done;
};

const getItem = async (storeName: string, id: string) => {
  if (!db) await initDB();
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const item = await store.get(id);
  await tx.done;
  return item;
};

const getAllItems = async (storeName: string) => {
  if (!db) await initDB();
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const items = await store.getAll();
  await tx.done;
  return items;
};

const deleteItem = async (storeName: string, id: string) => {
  if (!db) await initDB();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.delete(id);
  await tx.done;
};

const updateItem = async (storeName: string, item: unknown) => {
  if (!db) await initDB();
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.put(item);
  await tx.done;
};

export { initDB, addItem, getItem, getAllItems, deleteItem, updateItem };
