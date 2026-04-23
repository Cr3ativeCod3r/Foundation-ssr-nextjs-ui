/**
 * Banner-related types for ad banners and promotional content
 */

export interface BannerItem {
  id: number;
  link: string;
  imageUrl: string;
}

export interface BannerImage {
  id: number;
  url: string;
  caption?: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}
