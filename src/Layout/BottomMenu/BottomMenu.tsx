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
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Glassmorphism bar */}
      <nav className="bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-screen-xl mx-auto flex justify-around items-center py-1.5 px-2">
          {MENU_ITEMS.map((item) => {
            const active = isActive(item.id);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.id}
                className="flex flex-col items-center py-1.5 px-2 rounded-xl transition-all duration-200 relative group"
              >
                {/* Active indicator dot */}
                {active && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500" />
                )}

                <div
                  className={`
                    mb-0.5 transition-all duration-200
                    ${active
                      ? 'text-teal-600 scale-110'
                      : 'text-slate-400 group-hover:text-slate-600'
                    }
                  `}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                </div>

                <span
                  className={`
                    text-[10px] font-medium transition-colors duration-200
                    ${active ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600'}
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