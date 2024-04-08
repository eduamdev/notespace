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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const decryptedNote: Note = JSON.parse(decryptedNoteString);

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

// export const deleteNote = async (id: string): Promise<void> => {
//   // Implement deletion logic here
// };

export const getNotes = async (): Promise<Note[]> => {
  const notes: Note[] = [];
  // Retrieve encrypted notes from storage
  const encryptedNoteIds = await retrieveNoteIds();

  // Decrypt and parse each note
  for (const id of encryptedNoteIds) {
    const encryptedNote = await retrieveNote(id);
    if (encryptedNote) {
      try {
        const decryptedNoteString = decrypt(encryptedNote, key);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const decryptedNote: Note = JSON.parse(decryptedNoteString);
        notes.push(decryptedNote);
      } catch (error) {
        console.error("Error decrypting note:", error);
      }
    }
  }

  return notes;
};
