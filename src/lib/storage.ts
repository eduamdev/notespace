import PouchDB from "pouchdb";
import { Document } from "@/types";

const db = new PouchDB<Document>("notes");

export const retrieveDocumentIds = async (type: string): Promise<string[]> => {
  try {
    const result = await db.allDocs({ include_docs: true });
    return result.rows
      .filter((row) => row.doc && row.doc.type === type)
      .map((row) => row.id);
  } catch (error) {
    console.error(`Error retrieving ${type} IDs:`, error);
    throw error;
  }
};

export const retrieveDocument = async (
  id: string
): Promise<Document | null> => {
  try {
    const doc = await db.get(id);
    return doc;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "not_found") {
        return null;
      }
    }
    console.error(`Error retrieving document with ID ${id}:`, error);
    throw error;
  }
};

export const saveDocument = async (document: Document): Promise<void> => {
  try {
    await db.put(document);
  } catch (error) {
    console.error(`Error saving document with ID ${document._id}:`, error);
    throw error;
  }
};

// Functions for notes
export const retrieveNoteIds = async (): Promise<string[]> => {
  return retrieveDocumentIds("note");
};

export const retrieveNote = async (id: string): Promise<Uint8Array | null> => {
  const document = await retrieveDocument(id);
  return document ? document.data : null;
};

export const saveNote = async (
  id: string,
  encryptedNote: Uint8Array
): Promise<void> => {
  await saveDocument({
    _id: id,
    type: "note",
    data: encryptedNote,
  });
};

// Functions for notebooks
export const retrieveNotebookIds = async (): Promise<string[]> => {
  return retrieveDocumentIds("notebook");
};

export const retrieveNotebook = async (
  id: string
): Promise<Uint8Array | null> => {
  const document = await retrieveDocument(id);
  return document ? document.data : null;
};

export const saveNotebook = async (
  id: string,
  encryptedNotebook: Uint8Array
): Promise<void> => {
  await saveDocument({
    _id: id,
    type: "notebook",
    data: encryptedNotebook,
  });
};
