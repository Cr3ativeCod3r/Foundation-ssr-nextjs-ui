import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Decorative section header with accent line and optional icon.
 * Used for homepage sections, category pages, etc.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center gap-2.5 mb-1">
        {icon && (
          <span className="text-teal-500">{icon}</span>
        )}
        <h2 className="text-lg font-bold text-slate-800 tracking-tight uppercase">
          {title}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
      </div>
      {subtitle && (
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;
