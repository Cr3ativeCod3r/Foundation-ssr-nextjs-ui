'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBanners } from '@/api/banners';
import type { BannerItem } from '@/types/banner';

interface AdBannerProps {
  bannerId?: number;
  className?: string;
  interval?: number;
  width?: string | number;
  height?: string | number;
}

const AdBanner: React.FC<AdBannerProps> = ({
  bannerId = 1,
  className = '',
  interval = 3000,
}) => {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBanners(bannerId);
        setBanners(data);
      } catch (error) {
        console.error('[AdBanner] Failed to load:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBanners();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [bannerId]);

  const advanceSlide = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
      setTimeout(() => setIsFading(false), 50);
    }, 300);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length > 1 && !isLoading) {
      timerRef.current = setInterval(advanceSlide, interval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [banners, isLoading, interval, advanceSlide]);

  if (isLoading) {
    return (
      <div className="animate-shimmer rounded-xl w-full h-[120px] md:h-[200px]" />
    );
  }

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-md w-full ${className}`}
    >
      {/* Ad label */}
      <span className="absolute top-2 left-2 z-10 text-[10px] font-medium text-white/80 bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
        Reklama
      </span>

      <Link
        href={currentBanner.link || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        {/* Use img tag for natural sizing — no cropping */}
        <img
          src={currentBanner.imageUrl}
          alt="Baner sponsorowany"
          className={`
            w-full h-auto max-h-[35vh] object-contain
            transition-opacity duration-300
            ${isFading ? 'opacity-0' : 'opacity-100'}
          `}
        />
      </Link>

      {/* Pagination dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(index);
              }}
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
                }
              `}
              aria-label={`Przejdź do banera ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdBanner;