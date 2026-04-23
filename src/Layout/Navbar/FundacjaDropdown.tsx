'use client';

import { useState } from 'react';
import { ChevronDown, Newspaper, FolderKanban, FileText, Handshake, Mail, Info } from 'lucide-react';
import Link from 'next/link';

interface FundacjaLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const FUNDACJA_LINKS: FundacjaLink[] = [
  { name: 'Aktualności', path: '/aktualnosci', icon: <Newspaper size={16} /> },
  { name: 'Projekty', path: '/projekty', icon: <FolderKanban size={16} /> },
  { name: 'Statut', path: '/statut', icon: <FileText size={16} /> },
  { name: 'Współpraca', path: '/wspolpraca', icon: <Handshake size={16} /> },
  { name: 'Kontakt', path: '/kontakt', icon: <Mail size={16} /> },
  { name: 'O nas', path: '/o-nas', icon: <Info size={16} /> },
];

const FundacjaDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
        <span>FUNDACJA</span>
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
          {FUNDACJA_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-slate-400 group-hover:text-teal-500 transition-colors">
                {link.icon}
              </span>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundacjaDropdown;