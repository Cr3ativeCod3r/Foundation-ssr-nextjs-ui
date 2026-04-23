import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TagsList from '@/components/ui/TagsList';
import type { NewsItem } from '@/types/news';

type CardVariant = 'default' | 'compact' | 'featured' | 'horizontal';

interface ArticleCardProps {
  news: NewsItem;
  variant?: CardVariant;
  showDescription?: boolean;
  showDate?: boolean;
  showReadMore?: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * Unified article card component with multiple layout variants.
 *
 * Variants:
 * - `default`    — Standard vertical card with image, tags, title, description
 * - `compact`    — Smaller card without description (used in grid top sections)
 * - `featured`   — Large card with gradient overlay text
 * - `horizontal` — Side-by-side image + text (used in sidebar lists)
 */
const ArticleCard: React.FC<ArticleCardProps> = ({
  news,
  variant = 'default',
  showDescription = true,
  showDate = true,
  showReadMore = false,
  className = '',
  priority = false,
}) => {
  const imageUrl = news.imageUrl
    ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}${news.imageUrl}`
    : null;

  const linkHref = `/${news.category.slug}/${news.slug}`;

  const formattedDate = showDate
    ? new Date(news.createdAt).toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  // ─── Horizontal variant ───
  if (variant === 'horizontal') {
    return (
      <Link href={linkHref} className={`block group ${className}`}>
        <div className="flex gap-3 py-3.5 border-b border-gray-100 transition-all duration-300 hover:bg-slate-50/50 rounded-lg px-2 -mx-2">
          {/* Thumbnail */}
          <div className="w-[140px] flex-shrink-0 relative overflow-hidden rounded-lg">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={news.header}
                width={140}
                height={90}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full aspect-[16/10] bg-slate-100 rounded-lg" />
            )}
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            <TagsList tags={news.tags} variant="compact" />
            <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors">
              {news.header}
            </h3>
            {formattedDate && (
              <span className="text-[11px] text-slate-400 mt-1">{formattedDate}</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // ─── Featured variant ───
  if (variant === 'featured') {
    return (
      <Link href={linkHref} className={`block group relative overflow-hidden rounded-2xl ${className}`}>
        <div className="relative aspect-[16/9] w-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={news.header}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Text on image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <TagsList tags={news.tags} variant="outline" />
            <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
              {news.header}
            </h3>
          </div>
        </div>
      </Link>
    );
  }

  // ─── Default / Compact variant ───
  return (
    <Link href={linkHref} className={`block group ${className}`}>
      <div className="card-elevated overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={news.header}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <span className="text-slate-400 text-sm">Brak zdjęcia</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <TagsList tags={news.tags} />

          <h3 className="text-base font-bold text-slate-800 mb-1.5 line-clamp-2 group-hover:text-teal-700 transition-colors leading-snug">
            {news.header}
          </h3>

          {showDescription && variant !== 'compact' && news.description && (
            <p className="text-sm text-slate-500 mb-3 line-clamp-2 leading-relaxed">
              {news.description}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-50">
            {formattedDate && (
              <span className="text-xs text-slate-400">{formattedDate}</span>
            )}
            {showReadMore && (
              <span className="text-xs font-semibold text-teal-600 group-hover:text-teal-500 transition-colors">
                Czytaj więcej →
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
