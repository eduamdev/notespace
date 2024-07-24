/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseDataProps<T> {
  queryKey: string;
  queryFn: () => Promise<T[]>;
  createFn: (item: T) => Promise<void>;
  updateFn: (item: T) => Promise<void>;
  deleteFn: (id: string) => Promise<void>;
  singleItemQueryFn?: (id: string) => Promise<T>;
}

export const useData = <T>(
  {
    queryKey,
    queryFn,
    createFn,
    updateFn,
    deleteFn,
    singleItemQueryFn,
  }: UseDataProps<T>,
  itemId?: string
) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn,
  });

  const singleItemQuery = useQuery<T>({
    queryKey: [queryKey, itemId],
    queryFn: () => singleItemQueryFn!(itemId!),
    enabled: !!singleItemQueryFn && !!itemId,
  });

  const createMutation = useMutation({
    mutationFn: createFn,
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
    singleItem: singleItemQuery.data,
    error: error ?? singleItemQuery.error,
    isLoading: isLoading || singleItemQuery.isLoading,
    createItem: createMutation.mutate,
    updateItem: updateMutation.mutate,
    deleteItem: deleteMutation.mutate,
  };
};
