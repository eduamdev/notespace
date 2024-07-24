import {
  createTag,
  deleteTag,
  getTags,
  updateTag,
} from "@/services/tag-service";
import { useData } from "@/hooks/use-data";
import { Tag } from "@/models/tag";

export const useTags = () =>
  useData<Tag>({
    queryKey: "tags",
    queryFn: getTags,
    createFn: createTag,
    updateFn: updateTag,
    deleteFn: deleteTag,
  });
