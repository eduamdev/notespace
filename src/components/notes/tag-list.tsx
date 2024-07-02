import { useTags } from "@/hooks/use-tags";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import TagForm from "@/components/notes/tag-form";
import { Tag } from "@/models/tag";

const filterTags = (tags: Tag[], query: string) => {
  if (!query) return tags;
  return tags.filter((tag) =>
    tag.name.toLowerCase().includes(query.toLowerCase())
  );
};

const TagList = () => {
  return (
    <ListManager<Tag>
      title="Tags"
      description="Add a tag to categorize your items."
      useItemsHook={useTags}
      FormComponent={TagForm}
      addItemText="Tag"
      ListComponent={({ items: tags }) => (
        <ItemList
          items={tags}
          renderItem={(tag) => (
            <div className="block w-full hover:bg-neutral-50 lg:px-6">
              <p className="truncate text-[15px] font-medium text-black">
                {tag.name}
              </p>
              <p className="text-[13px] text-neutral-500">0 notes</p>
            </div>
          )}
        />
      )}
      filterItems={filterTags}
    />
  );
};

export default TagList;