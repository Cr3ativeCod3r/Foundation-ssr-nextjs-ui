// import { BannerItem } from "@/types/news";

// const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
// const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;

// export async function fetchBanners(): Promise<BannerItem[]> {
//   const res = await fetch(`${API_URL}/banner-1?populate=*`);
//   const data = await res.json();

//   return data.data.map((item: any) => {
//     const coverPhoto = Array.isArray(item.cover_image) && item.cover_image.length > 0
//       ? item.cover_image[0]
//       : null;

//     const imageUrl =
//       coverPhoto?.url ||
//       coverPhoto?.formats?.medium?.url ||
//       coverPhoto?.formats?.large?.url ||
//       "";

//     return {
//       id: item.id,
//       link: item.cover_image.caption,
//       imageUrl: `${DOMAIN_URL}${imageUrl}`,
//     };
//   });
// }

import { BannerItem } from "@/types/news";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;

/**
 * Fetches banner data from Strapi API
 * @param bannerId - The ID of the banner to fetch, defaults to 1
 * @returns Array of BannerItem objects
 */
export async function fetchBanners(bannerId: number = 1): Promise<BannerItem[]> {
  try {
    const res = await fetch(`${API_URL}/banner-${bannerId}?populate=*`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch banners: ${res.status}`);
    }
    
    const responseData = await res.json();
    
    // Check if the data has the expected structure
    if (!responseData.data || !responseData.data.cover_image) {
      console.error("Unexpected API response structure:", responseData);
      return [];
    }
    
    // Extract the cover_image array from the response
    const coverImages = responseData.data.cover_image;
    
    // Ensure coverImages is an array
    if (!Array.isArray(coverImages)) {
      console.error("Cover images is not an array:", coverImages);
      return [];
    }
    
    // Map each cover image to a BannerItem
    return coverImages.map((image: any) => {
      // Determine the best available image URL
      const imageUrl = 
        image.url ||
        (image.formats?.medium?.url) ||
        (image.formats?.large?.url) ||
        (image.formats?.small?.url) ||
        "";
      
      return {
        id: image.id,
        link: image.caption || "", // Get the link from the caption
        imageUrl: `${DOMAIN_URL}${imageUrl}`,
      };
    });
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}