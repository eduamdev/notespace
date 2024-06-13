import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  initDB,
  addItem,
  updateItem,
  getAllItems,
  deleteItem,
} from "@/services/idb-service";
import { STORE_NAMES } from "@/lib/constants";
import { Notebook } from "@/models/notebook";

const addNotebook = async (notebook: Notebook) => {
  await initDB();
  await addItem(STORE_NAMES.NOTEBOOKS, notebook);
};

const getNotebooks = async () => {
  await initDB();
  return await getAllItems<Notebook>(STORE_NAMES.NOTEBOOKS);
};

const updateNotebook = async (note: Notebook) => {
  await initDB();
  await updateItem(STORE_NAMES.NOTEBOOKS, note);
};

const deleteNotebook = async (id: string) => {
  await initDB();
  await deleteItem(STORE_NAMES.NOTEBOOKS, id);
};

export const useNotebooks = () => {
  const queryClient = useQueryClient();

  const {
    data: notebooks,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["notebooks"],
    queryFn: getNotebooks,
  });

  const addNotebookMutation = useMutation({
    mutationFn: addNotebook,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["notebooks"],
      });
    },
  });

  const updateNotebookMutation = useMutation({
    mutationFn: updateNotebook,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["notebooks"],
      });
    },
  });

  const deleteNotebookMutation = useMutation({
    mutationFn: deleteNotebook,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["notebooks"],
      });
    },
  });

  return {
    notebooks,
    error,
    isLoading,
    addNotebook: addNotebookMutation.mutate,
    updateNotebook: updateNotebookMutation.mutate,
    deleteNotebook: deleteNotebookMutation.mutate,
  };
};
