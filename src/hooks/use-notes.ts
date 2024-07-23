import {
  addNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "@/services/note-service";
import { useData } from "@/hooks/use-data";
import { Note } from "@/models/note";

export const useNotes = (noteId?: string) =>
  useData<Note>(
    {
      queryKey: "notes",
      queryFn: getNotes,
      addFn: addNote,
      updateFn: updateNote,
      deleteFn: deleteNote,
      singleItemQueryFn: getNoteById,
    },
    noteId
  );
