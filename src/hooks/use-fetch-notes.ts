import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useEncryption } from "@/hooks/use-encryption";
import { useIDB } from "@/hooks/use-idb";
import { STORE_NAMES } from "@/lib/constants";
import { Note } from "@/models/note";

const useFetchNotes = () => {
  const { user } = useAuth();
  const { decryptData } = useEncryption();
  const { isInitialized, getAllItems } = useIDB();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (user && isInitialized) {
        const allEncryptedNotes = await getAllItems<Note>(STORE_NAMES.NOTES);
        const allDecryptedNotes = await Promise.all(
          allEncryptedNotes.map(async (note) => ({
            ...note,
            title: await decryptData(user.encryptionKey, note.title),
            content: await decryptData(user.encryptionKey, note.content),
          }))
        );
        setNotes(allDecryptedNotes);
      }
    };
    void fetchNotes();
  }, [decryptData, getAllItems, isInitialized, user]);

  return notes;
};

export default useFetchNotes;
