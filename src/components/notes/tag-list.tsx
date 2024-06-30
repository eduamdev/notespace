import { useTags } from "@/hooks/use-tags";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import TagForm from "@/components/notes/tag-form";
import { Tag } from "@/models/tag";

const TagList = () => {
  return (
    <ListManager<Tag>
      title="Tags"
      addItemText="Tag"
      useItemsHook={useTags}
      FormComponent={TagForm}
      ListComponent={({ items: tags }) => (
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
      )}
    />
  );
};

export default TagList;
