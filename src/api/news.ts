import { NewsItem, ApiResponseItem } from "@/types/news";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchLatestNews(start: number = 0, limit: number = 5): Promise<NewsItem[]> {
  const res = await fetch(
    `${API_URL}/posts?populate[category][populate]=cover_image&[populate]=image&sort=createdAt:desc&pagination[start]=${start}&pagination[limit]=${limit}`
  );
  const data = await res.json();

  return data.data.map((item: ApiResponseItem) => ({
    id: item.id,
    header: item.header,
    category: {
      slug: item.category.slug,
    },
    imageUrl: item.image?.url || (item.category.cover_image && item.category.cover_image?.formats?.medium?.url) || "",
    slug: item.slug,
    description: item.description,
    createdAt: item.createdAt,
  }));
}

export async function fetchPostBySlug(slug: string): Promise<NewsItem & {
  content: string;
  author: {
    name: string;
    imageUrl: string;
  };
}> {
  const res = await fetch(
    `${API_URL}/posts?filters[slug][$eq]=${slug}&populate[category][populate]=cover_image&populate=image&populate[gallery][populate]=*`
  );

  const data = await res.json();

  const item: ApiResponseItem = data.data[0];

  return {
    id: item.id,
    header: item.header,
    category: {
      slug: item.category.slug,
      name: item.category.name,
    },
    imageUrl: item.image?.url || item.category.cover_image?.formats.large.url || "",
    slug: item.slug,
    createdAt: item.createdAt,
    content: item.content,
    yt_link: item.yt_link,
    gallery: item.gallery,
    author: {
      name: item.author?.name || "Fundacja Choroby Mózgu",
      imageUrl: item.author?.image?.url || "",
    },
  };
}

export async function fetchRandomNews(
  excludeId: number,
  start: number = 0,
  limit: number = 5
): Promise<NewsItem[]> {
  const res = await fetch(
    `${API_URL}/posts?` +
    `populate[category][populate]=cover_image&` +
    `populate=image&` +
    `filters[id][$ne]=${excludeId}&` + 
    `pagination[start]=${start}&` +
    `pagination[limit]=${limit}&` +
    `sort=random`
  );

  const data = await res.json();

  return data.data.map((item: ApiResponseItem) => ({
    id: item.id,
    header: item.header,
    category: {
      slug: item.category.slug,
    },
    imageUrl:
      item.image?.url ||
      item.category.cover_image?.formats?.medium?.url ||
      "",
    slug: item.slug,
    description: item.description,
    createdAt: item.createdAt,
  }));
}