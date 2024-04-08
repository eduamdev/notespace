import { Folder, Note, Notebook } from "@/types";
import { decrypt, encrypt, getEncryptionKey } from "@/utils/encryption";
import {
  retrieveNotebook,
  retrieveNotebookIds,
  saveNotebook,
} from "@/utils/storage";
import { generateUniqueId } from "@/utils/utils";

const key = getEncryptionKey();

export const createNotebook = async (
  name: string,
  folders: Folder[],
  notes: Note[]
): Promise<string> => {
  const id = generateUniqueId();
  const notebook: Notebook = { id, name, folders, notes };
  const encryptedNotebook = encrypt(JSON.stringify(notebook), key);
  console.log(encryptedNotebook);
  await saveNotebook(id, encryptedNotebook);
  return id;
};

export const getNotebooks = async (): Promise<Notebook[]> => {
  const notebooks: Notebook[] = [];
  // Retrieve encrypted notebooks from storage
  const encryptedNotebookIds = await retrieveNotebookIds();

  // Decrypt and parse each notebook
  for (const id of encryptedNotebookIds) {
    const encryptedNotebook = await retrieveNotebook(id);
    if (encryptedNotebook) {
      try {
        const decryptedNotebookString = decrypt(encryptedNotebook, key);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const decryptedNotebook: Notebook = JSON.parse(decryptedNotebookString);
        notebooks.push(decryptedNotebook);
      } catch (error) {
        console.error("Error decrypting notebook:", error);
      }
    }
  }

  return notebooks;
};
