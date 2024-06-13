import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addNotebook,
  deleteNotebook,
  getNotebooks,
  updateNotebook,
} from "@/services/notebook-service";

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
