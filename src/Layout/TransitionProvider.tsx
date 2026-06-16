'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface TransitionProviderProps {
  children: ReactNode;
}

export default function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      className={pathname === '/mapa' ? '' : 'pt-[100px] pb-16 lg:pb-0'}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      }}
    >
      {children}
    </motion.div>
  );
}