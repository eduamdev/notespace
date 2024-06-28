import { Tag } from "@/models/tag";

interface TagListProps {
  tags: Tag[] | undefined;
}

const TagList = ({ tags }: TagListProps) => {
  if (!tags) {
    return;
  }

  return (
    <ul className="divide-y py-4">
      {tags.map((tag) => (
        <li key={tag.id} className="py-2">
          <span className="block w-full">
            <p className="truncate text-[15px] font-medium text-black">
              {tag.name}
            </p>
            <p className="text-[13px] text-neutral-500">0 notes</p>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
