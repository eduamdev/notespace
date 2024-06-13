import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTag, deleteTag, getTags, updateTag } from "@/services/tag-service";

export const useTags = () => {
  const queryClient = useQueryClient();

  const {
    data: tags,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const addTagMutation = useMutation({
    mutationFn: addTag,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
  });

  return {
    tags,
    error,
    isLoading,
    addTag: addTagMutation.mutate,
    updateTag: updateTagMutation.mutate,
    deleteTag: deleteTagMutation.mutate,
  };
};
