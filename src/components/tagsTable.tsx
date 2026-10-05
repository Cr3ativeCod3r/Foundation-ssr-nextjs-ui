import React from "react";

interface TagsListProps {
  tags?: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags = [] }) => {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block bg-emerald-400 text-white text-xs px-3 py-1 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default TagsList;