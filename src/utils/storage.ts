import PouchDB from "pouchdb";
import { Document } from "@/types";

const db = new PouchDB<Document>("notes");

export const retrieveNoteIds = async (): Promise<string[]> => {
  try {
    // Fetch all documents from the database
    const result = await db.allDocs({ include_docs: true });

    // Filter out only the documents of type "note"
    const noteIds = result.rows
      .filter((row) => row.doc && row.doc.type === "note")
      .map((row) => row.id);
    return noteIds;
  } catch (error) {
    console.error("Error retrieving note IDs:", error);
    throw error;
  }
};

export const retrieveNote = async (id: string): Promise<Uint8Array | null> => {
  try {
    // Fetch the document with the specified ID from the database
    const doc: Document = await db.get(id);

    // Check if the document is of type "note"
    if (doc.type === "note") {
      // Return the note data stored in the document
      return doc.data;
    } else {
      // If the document is not of type "note", return null
      return null;
    }
  } catch (error) {
    if (error.name === "not_found") {
      // If the document is not found, return null
      return null;
    }
    console.error(`Error retrieving note with ID ${id}:`, error);
    throw error;
  }
};

export const saveNote = async (id: string, data: Uint8Array): Promise<void> => {
  try {
    // Check if the document already exists in the database
    const existingDoc: Document = await db.get(id);

    // If the document exists, update its data
    existingDoc.data = data;

    // Save the updated document back to the database
    await db.put(existingDoc);
  } catch (error) {
    if (error.name === "not_found") {
      // If the document does not exist, create a new one with the specified ID and data
      await db.put<Document>({
        _id: id,
        type: "note",
        data: data,
      });
    } else {
      console.error(`Error saving note with ID ${id}:`, error);
      throw error;
    }
  }
};

export const retrieveNotebookIds = async (): Promise<string[]> => {
  try {
    // Fetch all documents from the database
    const result = await db.allDocs({ include_docs: true });

    // Filter out only the documents of type "notebook"
    const notebookIds = result.rows
      .filter((row) => row.doc && row.doc.type === "notebook")
      .map((row) => row.id);
    return notebookIds;
  } catch (error) {
    console.error("Error retrieving notebook IDs:", error);
    throw error;
  }
};

export const retrieveNotebook = async (
  id: string
): Promise<Uint8Array | null> => {
  try {
    // Fetch the document with the specified ID from the database
    const doc: Document = await db.get(id);

    // Check if the document is of type "notebook"
    if (doc.type === "notebook") {
      // Return the notebook data stored in the document
      return doc.data;
    } else {
      // If the document is not of type "notebook", return null
      return null;
    }
  } catch (error) {
    if (error.name === "not_found") {
      // If the document is not found, return null
      return null;
    }
    console.error(`Error retrieving notebook with ID ${id}:`, error);
    throw error;
  }
};

export const saveNotebook = async (
  id: string,
  data: Uint8Array
): Promise<void> => {
  try {
    const existingDoc: Document = await db.get(id);

    existingDoc.data = data;

    await db.put({
      _id: id,
      type: "notebook",
      data: data,
    });
  } catch (error) {
    if (error.name === "not_found") {
      await db.put<Document>({
        _id: id,
        type: "notebook",
        data: data,
      });
    } else {
      console.error(`Error saving notebook with ID ${id}:`, error);
      throw error;
    }
  }
};
