"use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { fetchBanners } from "@/api/banners";
// import { BannerItem } from "@/types/news";

// export const AdBanner: React.FC<{ className?: string }> = ({ className }) => {
//   const [banner, setBanner] = useState<BannerItem | null>(null);

//   useEffect(() => {
//     async function loadBanner() {
//       const banners = await fetchBanners();
//       if (banners.length > 0) {
//         setBanner(banners[0]);
//       }
//     }

//     loadBanner();
//   }, []);

//   if (!banner) {
//     return (
//       <div className={`bg-gray-100 border border-gray-200 flex items-center justify-center mb-6 aspect-[4/1] w-full ${className}`}>
//         <span className="text-gray-500">Ładowanie...</span>
//       </div>
//     );
//   }

//   return (
//     <div className={`relative  bg-gray-100 border border-gray-200 mb-6 ${className}`}>
//       <a href={banner.link} target="_blank" rel="noopener noreferrer" className="w-full h-full block relative">
//         <Image 
//           src={banner.imageUrl} 
//           alt="Baner sponsorowany"
//           fill
//           className="object-cover" // najważniejsza zmiana
//           sizes="(max-width: 768px) 100vw, 800px"
//         />
//       </a>
//     </div>
//   );
// };
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchBanners } from "@/api/banners";
import { BannerItem } from "@/types/news";
import styles from "./AdBanner.module.css";

interface AdBannerProps {
  bannerId?: number;
  className?: string;
  interval?: number; // Time in milliseconds between transitions
  width?: string | number;
  height?: string | number;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  bannerId = 1, 
  className = "",
  interval = 3000, // Default to 3 seconds
  width = "100%",
  height = "auto"
}) => {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadBanner = async () => {
      try {
        setIsLoading(true);
        const bannerData = await fetchBanners(bannerId);
        setBanners(bannerData);
      } catch (err) {
        console.error("Failed to load banner:", err);
        setError("Failed to load banner");
      } finally {
        setIsLoading(false);
      }
    };

    loadBanner();

    // Clean up function to clear the timer when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [bannerId]);

  // Set up rotation timer when banners are loaded
  useEffect(() => {
    // Only set up rotation if there are multiple banners
    if (banners.length > 1 && !isLoading) {
      timerRef.current = setInterval(() => {
        setIsFading(true);
        
        // Wait for fade out animation to complete
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
          
          // Wait a bit before starting fade in
          setTimeout(() => {
            setIsFading(false);
          }, 50);
        }, 300); // This should match the CSS transition time
      }, interval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [banners, isLoading, interval]);

  if (isLoading) {
    return (
      <div 
        className={styles["ad-banner-skeleton"]} 
        style={{ width, height }}
      ></div>
    );
  }
  
  if (error) {
    return (
      <div 
        className={styles["ad-banner-error"]}
        style={{ width, height }}
      >
        {error}
      </div>
    );
  }
  
  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  return (
    <div 
      className={`${styles["ad-banner-container"]} ${className}`}
      style={{ width, height }}
    >
      <Link 
        href={currentBanner.link || "#"} 
        key={currentBanner.id} 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles["banner-link"]}
      >
        <div className={styles["ad-banner-item"]}>
          <Image
            src={currentBanner.imageUrl}
            alt="Advertisement"
            fill
            priority // Added priority prop to address the LCP warning
            className={`${styles["ad-banner-image"]} ${isFading ? styles["fade-out"] : styles["fade-in"]}`}
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>
      
      {/* Pagination indicators for multiple banners */}
      {banners.length > 1 && (
        <div className={styles["banner-pagination"]}>
          {banners.map((_, index) => (
            <span 
              key={`indicator-${index}`}
              className={`${styles["pagination-dot"]} ${index === currentIndex ? styles["active"] : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdBanner;