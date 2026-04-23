'use client';

import { useState, useEffect, useCallback } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) {
      setProgress(0);
      return;
    }
    const currentProgress = (window.scrollY / totalHeight) * 100;
    setProgress(Math.min(currentProgress, 100));
  }, []);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [updateProgress]);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Postęp przewijania strony"
      className="w-full h-[3px] bg-gray-100/50"
    >
      <div
        className="h-full transition-[width] duration-100 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))',
        }}
      />
    </div>
  );
}