import localforage from "localforage";

const noteStorage = localforage.createInstance({
  name: "note_storage",
});

export const initializeStorage = async () => {
  await noteStorage.ready();
};

export const saveNote = async (id: string, encryptedNote: Uint8Array) => {
  try {
    await noteStorage.setItem(id, encryptedNote);
  } catch (error) {
    console.error("Error saving note:", error);
    throw error;
  }
};

export const retrieveNote = async (id: string): Promise<Uint8Array | null> => {
  try {
    return await noteStorage.getItem(id);
  } catch (error) {
    console.error("Error retrieving note:", error);
    throw error;
  }
};

const noteIdsKey = "note_storage";

export const retrieveNoteIds = async (): Promise<string[]> => {
  try {
    // Retrieve note IDs from localforage
    const noteIds = await localforage.getItem<string[]>(noteIdsKey);
    return noteIds ?? [];
  } catch (error) {
    console.error("Error retrieving note IDs:", error);
    throw error;
  }
};
