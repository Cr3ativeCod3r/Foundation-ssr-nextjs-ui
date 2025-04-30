'use client'
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  
  // Elegancka animacja inspirowana medycznym skanowaniem
  return (
    <>
      {/* Główna zawartość strony z płynną animacją */}
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
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1] // Płynna krzywa przejścia (cubic-bezier)
        }}
      >
        {children}
      </motion.div>

      {/* Subtelny pasek postępu na górze ekranu - efekt skanowania */}
      {/* <motion.div
        key={`progress-${pathname}`}
        className="fixed top-0 left-0 w-full h-0.5 bg-blue-500 z-50"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ 
          scaleX: 1,
          transition: { duration: 0.7, ease: "easeOut" }
        }}
        exit={{ opacity: 0 }}
      />
       */}
      {/* Subtelny efekt lekkiego niebieskiego błysku - kojarzy się z obrazowaniem medycznym */}
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