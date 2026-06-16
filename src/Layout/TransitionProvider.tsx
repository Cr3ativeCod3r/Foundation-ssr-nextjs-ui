'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface TransitionProviderProps {
  children: ReactNode;
}

const ROUTES = ['/', '/kategorie', '/fundacja', '/mapa', '/brain', '/search'];

export default function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;

    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    const isValidSwipe = Math.abs(distanceX) > 50;

    if (isHorizontalSwipe && isValidSwipe) {
      let currentIndex = ROUTES.findIndex((r) =>
        r === '/' ? pathname === '/' : pathname.startsWith(r)
      );
      if (currentIndex === -1) currentIndex = 0;

      const isLeftSwipe = distanceX > 0;
      const isRightSwipe = distanceX < 0;

      if (isLeftSwipe && currentIndex < ROUTES.length - 1) {
        router.push(ROUTES[currentIndex + 1]);
      }
      if (isRightSwipe && currentIndex > 0) {
        router.push(ROUTES[currentIndex - 1]);
      }
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
      className="min-h-screen"
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1], // ease-out-expo
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}