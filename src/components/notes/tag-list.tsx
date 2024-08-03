import { Link } from "wouter";
import { useTags } from "@/hooks/use-tags";
import { useNotes } from "@/hooks/use-notes";
import ListManager from "@/components/list-manager";
import ItemList from "@/components/item-list";
import TagForm from "@/components/notes/tag-form";
import { HashIcon } from "@/components/icons/hash-icon";
import { filterTags, getNoteCountForTag } from "@/lib/notes";
import { Tag } from "@/models/tag";

const TagList = () => {
  const { createItem } = useTags();
  const { items: notes } = useNotes();

  return (
    <ListManager<Tag>
      title="Tags"
      itemName="Tag"
      useItemsHook={useTags}
      headerAction={<TagForm createItem={createItem} />}
      ListComponent={({ items: tags }) => (
        <ItemList
          items={tags}
          renderItem={(tag) => (
            <Link href={`/tags/${tag.id}`}>
              <div className="grid w-full grid-cols-[1fr_auto] gap-x-4 px-4 py-1 hover:bg-neutral-50 lg:px-6">
                <p className="truncate">
                  <HashIcon className="inline size-4 shrink-0 " />
                  <span className="font-semibold">{tag.name}</span>
                </p>
                <p className="truncate text-[13px] leading-7 text-neutral-500">
                  {getNoteCountForTag(tag, notes)}
                </p>
              </div>
            </Link>
          )}
        />
      )}
      filterItems={filterTags}
    />
  );
};

export default TagList;
