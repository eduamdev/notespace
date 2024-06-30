import {
  addNotebook,
  deleteNotebook,
  getNotebooks,
  updateNotebook,
} from "@/services/notebook-service";
import { useData } from "@/hooks/use-data";
import { Notebook } from "@/models/notebook";

export const useNotebooks = () =>
  useData<Notebook>({
    queryKey: "notebooks",
    queryFn: getNotebooks,
    addFn: addNotebook,
    updateFn: updateNotebook,
    deleteFn: deleteNotebook,
  });
