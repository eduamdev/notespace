import {
  createNotebook,
  deleteNotebook,
  getNotebookById,
  getNotebooks,
  updateNotebook,
} from "@/services/notebook-service";
import { useData } from "@/hooks/use-data";
import { Notebook } from "@/models/notebook";

export const useNotebooks = (notebookId?: string) =>
  useData<Notebook>(
    {
      queryKey: "notebooks",
      queryFn: getNotebooks,
      createFn: createNotebook,
      updateFn: updateNotebook,
      deleteFn: deleteNotebook,
      singleItemQueryFn: getNotebookById,
    },
    notebookId
  );
