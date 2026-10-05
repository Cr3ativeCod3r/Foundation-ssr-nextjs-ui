'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  url: string;
  alternativeText?: string;
}

interface PostGalleryProps {
  gallery: GalleryItem[];
}

export default function PostGallery({ gallery }: PostGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (gallery.length === 0) return null;

  return (
    <>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Galeria</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map((item, index) => {
            const imageUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${item.url}`;
            return (
              <button
                key={index}
                onClick={() => setSelectedImage(imageUrl)}
                className="relative aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <Image
                  src={imageUrl}
                  alt={item.alternativeText || `Zdjęcie ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn
                    size={28}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Zamknij"
          >
            <X size={28} />
          </button>

          <div className="relative max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Powiększone zdjęcie"
              width={1200}
              height={800}
              className="object-contain max-h-[85vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}