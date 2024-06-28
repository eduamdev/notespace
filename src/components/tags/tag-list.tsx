import ItemList from "@/components/item-list";
import { Tag } from "@/models/tag";

interface TagListProps {
  tags: Tag[] | undefined;
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <ItemList
      items={tags}
      renderItem={(tag) => (
        <span className="block w-full">
          <p className="truncate text-[15px] font-medium text-black">
            {tag.name}
          </p>
          <p className="text-[13px] text-neutral-500">0 notes</p>
        </span>
      )}
    />
  );
};

export default TagList;
