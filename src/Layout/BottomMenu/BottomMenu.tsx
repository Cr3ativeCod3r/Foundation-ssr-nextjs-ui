'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Users, MapPin, Brain, Search } from 'lucide-react';

const MENU_ITEMS = [
  { id: '/', name: 'Główna', icon: Home },
  { id: '/kategorie', name: 'Kategorie', icon: LayoutGrid },
  { id: '/fundacja', name: 'Fundacja', icon: Users },
  { id: '/mapa', name: 'Ośrodki', icon: MapPin },
  { id: '/brain', name: 'Mózg', icon: Brain },
  { id: '/search', name: 'Szukaj', icon: Search },
] as const;

export default function BottomMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden flex justify-center pointer-events-none">
      {/* Floating Glassmorphism Island - Dark Mode Ultra Glass */}
      <nav className="w-full max-w-sm bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full p-1.5 pointer-events-auto">
        <div className="flex justify-between items-center w-full">
          {MENU_ITEMS.map((item) => {
            const active = isActive(item.id);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.id}
                className={`
                  flex flex-col items-center justify-center flex-1 py-1.5 rounded-full transition-all duration-300
                  ${active 
                    ? 'bg-teal-500 text-white shadow-md transform scale-105' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <Icon size={active ? 22 : 20} strokeWidth={active ? 2.5 : 2} />
                <span
                  className={`
                    text-[10px] font-medium mt-0.5 whitespace-nowrap transition-colors duration-200
                    ${active ? 'text-white' : 'text-white/70'}
                  `}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}