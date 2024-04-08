import { encrypt, decrypt, getEncryptionKey } from "@/utils/encryption";
import { saveNote, retrieveNote, retrieveNoteIds } from "@/utils/storage";
import { generateUniqueId } from "@/utils/utils";
import { Note } from "@/types";

const key = getEncryptionKey();

export const createNote = async (
  title: string,
  content: string
): Promise<string> => {
  const id = generateUniqueId();
  const note: Note = { id, title, content };
  const encryptedNote = encrypt(JSON.stringify(note), key);
  await saveNote(id, encryptedNote);
  return id;
};

export const getNote = async (id: string): Promise<Note | null> => {
  const encryptedNote = await retrieveNote(id);
  if (!encryptedNote) return null;

  const decryptedNoteString = decrypt(encryptedNote, key);
  const decryptedNote = JSON.parse(decryptedNoteString) as Note;
  return decryptedNote;
};

export const updateNote = async (
  id: string,
  title: string,
  content: string
): Promise<void> => {
  const encryptedNote = encrypt(JSON.stringify({ id, title, content }), key);
  await saveNote(id, encryptedNote);
};

export const getNotes = async (): Promise<Note[]> => {
  const notes: Note[] = [];
  const encryptedNoteIds = await retrieveNoteIds();

  // Decrypt and parse each note
  for (const id of encryptedNoteIds) {
    const encryptedNote = await retrieveNote(id);
    if (encryptedNote) {
      try {
        const decryptedNoteString = decrypt(encryptedNote, key);
        const decryptedNote = JSON.parse(decryptedNoteString) as Note;
        notes.push(decryptedNote);
      } catch (error) {
        console.error("Error decrypting note:", error);
      }
    }
  }

  return notes;
};
