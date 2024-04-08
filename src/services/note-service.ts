import { encrypt, decrypt, getEncryptionKey } from "@/utils/encryption";
import {
  saveNote,
  retrieveNote,
  retrieveNoteIds,
  saveNotebook,
  retrieveNotebookIds,
  retrieveNotebook,
} from "@/utils/storage";
import { generateUniqueId } from "@/utils/utils";
import { Folder, Note, Notebook } from "@/types";

const key = getEncryptionKey();

// Common Functions
const encryptData = (data: unknown): Uint8Array => {
  return encrypt(JSON.stringify(data), key);
};

const decryptData = (encryptedData: Uint8Array): unknown => {
  const decryptedDataString = decrypt(encryptedData, key);
  return JSON.parse(decryptedDataString);
};

const getDecryptedItems = async <T>(
  retrieveIds: () => Promise<string[]>,
  retrieveItem: (id: string) => Promise<Uint8Array | null>
): Promise<T[]> => {
  const items: T[] = [];
  const encryptedIds = await retrieveIds();
  for (const id of encryptedIds) {
    const encryptedItem = await retrieveItem(id);
    if (encryptedItem) {
      try {
        const decryptedItem = decryptData(encryptedItem) as T;
        items.push(decryptedItem);
      } catch (error) {
        console.error(`Error decrypting item with ID ${id}:`, error);
      }
    }
  }
  return items;
};

// Notes
export const createNote = async (
  title: string,
  content: string
): Promise<string> => {
  const id = generateUniqueId();
  const note: Note = { id, title, content };
  const encryptedNote = encryptData(note);
  await saveNote(id, encryptedNote);
  return id;
};

export const getNote = async (id: string): Promise<Note | null> => {
  const encryptedNote = await retrieveNote(id);
  return encryptedNote ? (decryptData(encryptedNote) as Note) : null;
};

export const updateNote = async (
  id: string,
  title: string,
  content: string
): Promise<void> => {
  const encryptedNote = encryptData({ id, title, content });
  await saveNote(id, encryptedNote);
};

export const getNotes = async (): Promise<Note[]> => {
  return getDecryptedItems<Note>(retrieveNoteIds, retrieveNote);
};

// Notebooks
export const createNotebook = async (
  name: string,
  folders: Folder[],
  notes: Note[]
): Promise<string> => {
  const id = generateUniqueId();
  const notebook: Notebook = { id, name, folders, notes };
  const encryptedNotebook = encryptData(notebook);
  await saveNotebook(id, encryptedNotebook);
  return id;
};

export const getNotebooks = async (): Promise<Notebook[]> => {
  return getDecryptedItems<Notebook>(retrieveNotebookIds, retrieveNotebook);
};
