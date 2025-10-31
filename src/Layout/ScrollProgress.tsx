'use client'
import { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
  const topOffset = 100;
  const height = 4;
  const color = "#3b82f6";
  const backgroundColor = "#e5e7eb";

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / totalHeight) * 100;
      setScrollProgress(parseFloat(progress.toFixed(2)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      style={{ top: `${topOffset}px` }}
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Postęp przewijania strony"
    >
      <div 
        className="w-full" 
        style={{ height: `${height}px`, backgroundColor }}
      >
        <div
          className="h-full transition-all duration-150 ease-out bg-[#99d1c8]"
          style={{ 
            width: `${scrollProgress}%`,
          }}
        />
      </div>
    </div>
  );
}