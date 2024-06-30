import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseDataProps<T> {
  queryKey: string;
  queryFn: () => Promise<T[]>;
  addFn: (item: T) => Promise<void>;
  updateFn: (item: T) => Promise<void>;
  deleteFn: (id: string) => Promise<void>;
}

export const useData = <T>({
  queryKey,
  queryFn,
  addFn,
  updateFn,
  deleteFn,
}: UseDataProps<T>) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn,
  });

  const addMutation = useMutation({
    mutationFn: addFn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateFn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return {
    items: data ?? [],
    error,
    isLoading,
    addItem: addMutation.mutate,
    updateItem: updateMutation.mutate,
    deleteItem: deleteMutation.mutate,
  };
};
