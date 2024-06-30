import { addTag, deleteTag, getTags, updateTag } from "@/services/tag-service";
import { useData } from "@/hooks/use-data";
import { Tag } from "@/models/tag";

export const useTags = () =>
  useData<Tag>({
    queryKey: "tags",
    queryFn: getTags,
    addFn: addTag,
    updateFn: updateTag,
    deleteFn: deleteTag,
  });
