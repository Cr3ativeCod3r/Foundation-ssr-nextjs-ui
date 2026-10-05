import React from 'react';

interface TagsListProps {
  tags?: string[];
  variant?: 'default' | 'compact' | 'outline';
}

/**
 * Renders a list of tags as colored pill badges.
 *
 * @param tags    - Array of tag name strings
 * @param variant - Visual style: 'default' (filled), 'compact' (small), 'outline' (bordered)
 */
const TagsList: React.FC<TagsListProps> = ({ tags = [], variant = 'default' }) => {
  if (tags.length === 0) return null;

  const variantStyles = {
    default:
      'bg-teal-50 text-teal-700 border border-teal-100 text-xs px-2.5 py-0.5 rounded-full font-medium',
    compact:
      'bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-medium',
    outline:
      'border border-teal-200 text-teal-600 text-xs px-2.5 py-0.5 rounded-full font-medium',
  };

  return (
    <div className="flex flex-wrap gap-1.5 mb-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-block transition-colors duration-150 hover:bg-teal-100 ${variantStyles[variant]}`}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};

export default TagsList;
