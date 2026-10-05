'use client';

import { useEffect } from 'react';

/** Disables page scrolling while mounted (used by full-window report view) */
export default function ScrollLock() {
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = previous;
    };
  }, []);

  return null;
}
