import { type BlocksContent } from '@strapi/blocks-react-renderer';
import type { PaginationMeta } from './common';

/* ═══════════════════════════════════════════════════
   Domain Types — News, Categories, Posts
   ═══════════════════════════════════════════════════ */

/** Author of a post */
export interface Author {
  name: string;
  imageUrl: string;
}

/** Category attached to a post */
export interface Category {
  name: string;
  slug: string;
  imageUrl?: string;
  cover_image?: {
    url: string;
    formats: {
      small: { url: string };
      medium: { url: string };
      large: { url: string };
    };
  };
}

/** Gallery image entry */
export interface GalleryImage {
  url: string;
  alternativeText?: string;
}

/** Tag group structure from Strapi */
export interface TagGroup {
  Tag: { name: string }[];
}

/** Fully parsed news item used in the UI */
export interface NewsItem {
  id: number;
  header: string;
  description: string | null;
  category: Pick<Category, 'slug' | 'name'>;
  content: BlocksContent;
  slug: string;
  imageUrl: string;
  createdAt: string;
  gallery: GalleryImage[];
  tags: string[];
  author: Author;
  yt_link: string;
}

/** Raw Strapi API response shape for a single post */
export interface ApiResponseItem {
  id: number;
  header: string;
  description: string;
  category: {
    slug: string;
    name: string;
    cover_image?: {
      url: string;
      formats: {
        small: { url: string };
        medium: { url: string };
        large: { url: string };
      };
    };
  };
  image?: {
    url: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  slug: string;
  createdAt: string;
  content: BlocksContent;
  yt_link: string;
  gallery: string[];
  publishedAt: string;
  author: {
    name: string;
    image: { url: string };
  };
  tags: TagGroup[];
}

/** Response shape for paginated post listings */
export interface PostsResponse {
  data: NewsItem[];
  meta: {
    pagination: PaginationMeta;
  };
}

// Re-export PaginationMeta for backward compatibility
export type { PaginationMeta } from './common';