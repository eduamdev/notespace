import { decrypt, encrypt, getEncryptionKey } from "@/utils/encryption";
import {
  retrieveNotebook,
  retrieveNotebookIds,
  saveNotebook,
} from "@/utils/storage";
import { generateUniqueId } from "@/utils/utils";
import { Folder, Note, Notebook } from "@/types";

const key = getEncryptionKey();

export const createNotebook = async (
  name: string,
  folders: Folder[],
  notes: Note[]
): Promise<string> => {
  const id = generateUniqueId();
  const notebook: Notebook = { id, name, folders, notes };
  const encryptedNotebook = encrypt(JSON.stringify(notebook), key);
  await saveNotebook(id, encryptedNotebook);
  return id;
};

export const getNotebooks = async (): Promise<Notebook[]> => {
  const notebooks: Notebook[] = [];
  const encryptedNotebookIds = await retrieveNotebookIds();

  // Decrypt and parse each notebook
  for (const id of encryptedNotebookIds) {
    const encryptedNotebook = await retrieveNotebook(id);
    if (encryptedNotebook) {
      try {
        const decryptedNotebookString = decrypt(encryptedNotebook, key);
        const decryptedNotebook = JSON.parse(
          decryptedNotebookString
        ) as Notebook;
        notebooks.push(decryptedNotebook);
      } catch (error) {
        console.error("Error decrypting notebook:", error);
      }
    }
  }

  return notebooks;
};
