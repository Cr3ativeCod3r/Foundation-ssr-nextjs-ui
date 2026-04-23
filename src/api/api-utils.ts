/**
 * API response parsing utilities for Strapi data transformation.
 * Converts raw Strapi API responses into clean, typed domain objects.
 */

import type { ApiResponseItem, NewsItem, TagGroup } from '@/types/news';

/* ═══════════════════════════════════════════════════
   Tag Parsing
   ═══════════════════════════════════════════════════ */

/**
 * Parses nested tag groups from Strapi into a flat string array.
 *
 * @param tags - Raw tag data from Strapi (array of TagGroup objects)
 * @returns Flat array of tag name strings
 */
export function parseTags(tags: TagGroup[] | undefined | null): string[] {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags.flatMap((tagGroup) => {
    if (Array.isArray(tagGroup.Tag)) {
      return tagGroup.Tag.map((tag) => tag.name);
    }
    return [];
  });
}

/* ═══════════════════════════════════════════════════
   Image URL Resolution
   ═══════════════════════════════════════════════════ */

interface ImageData {
  url?: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

type ImageFormat = 'small' | 'medium' | 'large';

/**
 * Extracts the best available image URL from Strapi image data.
 * Priority: post image → preferred format → any available format → category cover → empty string.
 *
 * @param image            - Post image (array or object)
 * @param categoryCoverImage - Fallback category cover image
 * @param preferredFormat  - Preferred image size format
 * @returns Resolved image URL string
 */
export function parseImageUrl(
  image: ImageData | ImageData[] | undefined | null,
  categoryCoverImage?: ImageData | null,
  preferredFormat: ImageFormat = 'medium',
): string {
  // Try image array (Strapi v4 format)
  if (Array.isArray(image) && image.length > 0) {
    const img = image[0];
    return img?.formats?.[preferredFormat]?.url || img?.url || '';
  }

  // Try direct image object
  if (image && typeof image === 'object' && !Array.isArray(image)) {
    return image?.formats?.[preferredFormat]?.url || image?.url || '';
  }

  // Fallback to category cover image
  if (categoryCoverImage) {
    return (
      categoryCoverImage?.formats?.[preferredFormat]?.url ||
      categoryCoverImage?.url ||
      ''
    );
  }

  return '';
}

/* ═══════════════════════════════════════════════════
   News Item Parsers
   ═══════════════════════════════════════════════════ */

/**
 * Parses a complete NewsItem from raw Strapi API response.
 * Includes all fields: content, gallery, author, etc.
 */
export function parseNewsItem(item: ApiResponseItem): NewsItem {
  return {
    id: item.id,
    header: item.header,
    description: item.description,
    category: {
      slug: item.category.slug,
      name: item.category.name,
    },
    imageUrl: parseImageUrl(item.image, item.category?.cover_image),
    slug: item.slug,
    createdAt: item.createdAt,
    tags: parseTags(item.tags),
    content: item.content,
    yt_link: item.yt_link,
    gallery: Array.isArray(item.gallery)
      ? item.gallery.map((g) => (typeof g === 'string' ? { url: g } : g))
      : [],
    author: {
      name: item.author?.name || 'Fundacja Choroby Mózgu',
      imageUrl: item.author?.image?.url || '',
    },
  };
}

/**
 * Parses a minimal NewsItem for list/card views.
 * Omits heavy fields like content, gallery, and author details.
 */
export function parseNewsItemMinimal(item: ApiResponseItem): NewsItem {
  return {
    id: item.id,
    header: item.header,
    description: item.description,
    category: {
      slug: item.category.slug,
      name: item.category?.name || '',
    },
    imageUrl: parseImageUrl(item.image, item.category?.cover_image),
    slug: item.slug,
    createdAt: item.createdAt,
    tags: parseTags(item.tags),
    content: [] as unknown as NewsItem['content'],
    yt_link: '',
    gallery: [],
    author: {
      name: item.author?.name || 'Fundacja Choroby Mózgu',
      imageUrl: '',
    },
  };
}
