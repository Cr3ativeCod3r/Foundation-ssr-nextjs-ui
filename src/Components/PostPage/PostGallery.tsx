"use client";

import Image from "next/image";

export default function PostGallery({ 
  gallery 
}: { 
  gallery: { url: string; alternativeText?: string }[] 
}) {
  const handleImageClick = (url: string) => {
    const fullImageUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${url}`;
    window.open(fullImageUrl, "_blank");
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Galeria</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((item, index) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}${item.url}`;
          return (
            <div
              key={index}
              className="relative h-64 overflow-hidden rounded-lg cursor-pointer"
              onClick={() => handleImageClick(item.url)}
            >
              <Image 
                src={imageUrl} 
                alt={item.alternativeText || "Zdjęcie z galerii"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}