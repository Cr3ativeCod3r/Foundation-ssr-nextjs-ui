/**
 * Banners API — Fetch rotating ad/promotional banners
 */

import type { BannerItem, BannerImage } from '@/types/banner';
import { API_URL, DOMAIN_URL } from './api-config';

/**
 * Fetches banner images from Strapi for a specific banner slot.
 * Returns an array of banner items with resolved image URLs.
 *
 * @param bannerId - Banner slot identifier (defaults to 1)
 * @returns Array of BannerItem objects with full image URLs
 */
export async function fetchBanners(bannerId: number = 1): Promise<BannerItem[]> {
  try {
    const res = await fetch(`${API_URL}/banner-${bannerId}?populate=*`);

    if (!res.ok) {
      throw new Error(`Failed to fetch banners: ${res.status}`);
    }

    const responseData = await res.json();

    if (!responseData.data?.cover_image) {
      console.error('[fetchBanners] Unexpected response structure:', responseData);
      return [];
    }

    const coverImages: BannerImage[] = responseData.data.cover_image;

    if (!Array.isArray(coverImages)) {
      console.error('[fetchBanners] cover_image is not an array:', coverImages);
      return [];
    }

    return coverImages.map((image) => {
      const imageUrl =
        image.url ||
        image.formats?.medium?.url ||
        image.formats?.large?.url ||
        image.formats?.small?.url ||
        '';

      return {
        id: image.id,
        link: image.caption || '',
        imageUrl: `${DOMAIN_URL}${imageUrl}`,
      };
    });
  } catch (error) {
    console.error('[fetchBanners] Error:', error);
    return [];
  }
}