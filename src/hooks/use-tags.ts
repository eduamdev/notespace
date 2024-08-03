import {
  createTag,
  deleteTag,
  getTagById,
  getTags,
  updateTag,
} from "@/services/tag-service";
import { useData } from "@/hooks/use-data";
import { Tag } from "@/models/tag";

export const useTags = (tagId?: string) =>
  useData<Tag>(
    {
      queryKey: "tags",
      queryFn: getTags,
      createFn: createTag,
      updateFn: updateTag,
      deleteFn: deleteTag,
      singleItemQueryFn: getTagById,
    },
    tagId
  );
