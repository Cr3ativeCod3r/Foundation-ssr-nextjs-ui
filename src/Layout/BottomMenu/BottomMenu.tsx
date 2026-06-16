'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Users, MapPin, Search } from 'lucide-react';

const MENU_ITEMS = [
  { id: '/', name: 'Główna', icon: Home },
  { id: '/kategorie', name: 'Kategorie', icon: LayoutGrid },
  { id: '/fundacja', name: 'Fundacja', icon: Users },
  { id: '/mapa', name: 'Ośrodki', icon: MapPin },
  { id: '/search', name: 'Szukaj', icon: Search },
] as const;

import { motion } from 'framer-motion';

export default function BottomMenu() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden flex justify-center pointer-events-none">
      {/* Floating Glassmorphism Island - Dark Mode Ultra Glass */}
      <nav className="w-full max-w-sm bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl p-1.5 pointer-events-auto">
        <div className="flex justify-between items-center w-full">
          {MENU_ITEMS.map((item) => {
            const active = isActive(item.id);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.id}
                className={`
                  relative flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-300
                  ${active 
                    ? 'text-white transform scale-105' 
                    : 'text-white/70 hover:text-white'
                  }
                `}
              >
                {active && (
                  <motion.div
                    layoutId="bottom-nav-active-bg"
                    className="absolute inset-0 bg-white/20 rounded-xl shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center">
                  <Icon 
                    size={active ? 22 : 20} 
                    strokeWidth={active ? 2 : 2} 
                    fill={active ? "currentColor" : "none"} 
                  />
                  <span
                    className={`
                      text-[10px] font-medium mt-0.5 whitespace-nowrap transition-colors duration-200
                      ${active ? 'text-white' : 'text-white/70'}
                    `}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}