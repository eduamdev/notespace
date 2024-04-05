import PouchDB from "pouchdb";

interface NoteDocument {
  _id: string;
  _rev?: string;
  data: Uint8Array;
}

const db = new PouchDB<NoteDocument>("notes");

export const retrieveNoteIds = async (): Promise<string[]> => {
  try {
    // Fetch all documents from the database
    const result = await db.allDocs({ include_docs: false });
    // Extract and return the IDs of all documents
    return result.rows.map((row) => row.id);
  } catch (error) {
    console.error("Error retrieving note IDs:", error);
    throw error;
  }
};

export const retrieveNote = async (id: string): Promise<Uint8Array | null> => {
  try {
    // Fetch the document with the specified ID from the database
    const doc: NoteDocument = await db.get(id);
    // Return the note data stored in the document
    return doc.data;
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
    const existingDoc: NoteDocument = await db.get(id);

    // If the document exists, update its data
    existingDoc.data = data;

    // Save the updated document back to the database
    await db.put(existingDoc);
  } catch (error) {
    if (error.name === "not_found") {
      // If the document does not exist, create a new one with the specified ID and data
      await db.put<NoteDocument>({
        _id: id,
        data: data,
      });
    } else {
      console.error(`Error saving note with ID ${id}:`, error);
      throw error;
    }
  }
};
