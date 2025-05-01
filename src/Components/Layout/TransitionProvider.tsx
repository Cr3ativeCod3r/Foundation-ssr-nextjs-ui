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
          y: 15,
          filter: "blur(5px)"
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)"
        }}
        exit={{
          opacity: 0,
          y: -10,
          filter: "blur(3px)"
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {children}
      </motion.div>
      <motion.div
        key={`flash-${pathname}`}
        className="fixed inset-0 bg-blue-50 pointer-events-none z-40"
        initial={{ opacity: 0.3 }}
        animate={{
          opacity: 0,
          transition: { duration: 0.5 }
        }}
        exit={{ opacity: 0 }}
      />
    </>
  );
}