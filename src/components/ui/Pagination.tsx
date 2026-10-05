'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

/**
 * Modern pagination component with smart page truncation.
 * Shows first/last pages with ellipsis for large page counts.
 */
const Pagination: React.FC<PaginationProps> = ({ currentPage, pageCount, onPageChange }) => {
  if (pageCount <= 1) return null;

  /** Generate visible page numbers with smart truncation */
  const getVisiblePages = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    const delta = 1; // Pages around current

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1 || i === pageCount || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== 'ellipsis') {
        pages.push('ellipsis');
      }
    }

    return pages;
  };

  return (
    <nav aria-label="Paginacja" className="flex justify-center items-center gap-1.5 py-8">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Poprzednia strona"
        className={`
          flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${currentPage === 1
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }
        `}
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Poprzednia</span>
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`
                w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium
                transition-all duration-200
                ${currentPage === page
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-200'
                  : 'text-slate-600 hover:bg-slate-100'
                }
              `}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        aria-label="Następna strona"
        className={`
          flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${currentPage === pageCount
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }
        `}
      >
        <span className="hidden sm:inline">Następna</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
