import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  initDB,
  addItem,
  updateItem,
  getAllItems,
  deleteItem,
} from "@/services/idb-service";
import { STORE_NAMES } from "@/lib/constants";
import { Tag } from "@/models/tag";

export const addTag = async (tag: Tag) => {
  await initDB();
  await addItem(STORE_NAMES.TAGS, tag);
};

export const getTags = async () => {
  await initDB();
  return await getAllItems<Tag>(STORE_NAMES.TAGS);
};

export const updateTag = async (tag: Tag) => {
  await initDB();
  await updateItem(STORE_NAMES.TAGS, tag);
};

export const deleteTag = async (id: string) => {
  await initDB();
  await deleteItem(STORE_NAMES.TAGS, id);
};

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
