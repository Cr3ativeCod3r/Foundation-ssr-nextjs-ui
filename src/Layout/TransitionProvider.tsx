'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface TransitionProviderProps {
  children: ReactNode;
}

export default function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();

  return (
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
  );
}