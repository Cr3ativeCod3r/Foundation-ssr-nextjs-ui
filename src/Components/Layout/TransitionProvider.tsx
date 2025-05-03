'use client'
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <>
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          y: 6,
          filter: "blur(3px)"
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)"
        }}
        exit={{
          opacity: 0,
          y: -4,
          filter: "blur(2px)"
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
      <motion.div
        key={`flash-${pathname}`}
        className="fixed inset-0 bg-blue-50 pointer-events-none z-40"
        initial={{ opacity: 0.15 }}
        animate={{
          opacity: 0,
          transition: { duration: 0.6 }
        }}
        exit={{ opacity: 0 }}
      />
    </>
  );
}