'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import type { Category } from '@/types/news';

interface CategoriesDropdownProps {
  categories: Category[];
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredCategories = categories.filter(
    (cat) => cat.slug !== 'projekty' && cat.slug !== 'aktualnosci',
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
        <span>KATEGORIE</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute top-full left-0 pt-2 z-50
          transition-all duration-200 ease-out
          ${isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
          }
        `}
      >
        <div className="bg-white rounded-xl shadow-xl border border-gray-100/80 overflow-hidden w-[220px] py-1">
          {filteredCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesDropdown;