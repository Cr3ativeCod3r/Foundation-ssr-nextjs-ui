import { ApiResponseItem, NewsItem } from "@/types/news";
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchPostsByDescription(
  searchQuery: string,
  searchBy: 'header' | 'content' = 'content'
): Promise<NewsItem[]> {
  const filterField = searchBy === 'header' ? 'header' : 'content';
  
  const res = await fetch(
    `${API_URL}/posts?filters[${filterField}][$contains]=${encodeURIComponent(searchQuery)}&populate[category][populate]=cover_image&populate=image&populate[gallery][populate]=*`
  );

  const data = await res.json();

  return data.data.map((item: ApiResponseItem) => ({
    id: item.id,
    header: item.header,
    description: item.description,
    category: {
      slug: item.category.slug,
      name: item.category.name,
    },
    imageUrl:
      (Array.isArray(item.image) && item.image.length > 0 && item.image[0]?.url) ||
      item.category?.cover_image?.url ||
      "",
    slug: item.slug,
    createdAt: item.createdAt,
    yt_link: item.yt_link,
    gallery: item.gallery,
  }));
}