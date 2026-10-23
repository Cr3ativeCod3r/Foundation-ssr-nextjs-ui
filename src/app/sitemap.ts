import { MetadataRoute } from "next";
import { fetchPostIndex } from "@/api/news";
import { SITE_URL } from "@/utils/seo";

export const revalidate = 3600;

const categories = [
  "aktualnosci",
  "alzheimer",
  "drzenie-samoistne",
  "migrena",
  "padaczka",
  "parkinson",
  "projekty",
  "spastycznosc",
  "stwardnienie-rozsiane",
  "udar-mozgu",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPostIndex();
  const latest = posts[0]?.updatedAt ? new Date(posts[0].updatedAt) : new Date();

  const mainPage = {
    url: SITE_URL,
    lastModified: latest,
    changeFrequency: "daily" as const,
    priority: 1.0,
  };

  const categoryUrls = categories.map((slug) => {
    const newest = posts.find((p) => p.category?.slug === slug);
    return {
      url: `${SITE_URL}/${slug}`,
      lastModified: newest ? new Date(newest.updatedAt) : latest,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  const postUrls = posts.map((post) => ({
    url: `${SITE_URL}/${post.category!.slug}/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const staticPages = [
    "o-nas",
    "fundacja",
    "mapa",
    "kategorie",
    "brain",
    "wspolpraca",
    "wesprzyj",
    "statut",
    "kontakt",
  ].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [mainPage, ...categoryUrls, ...postUrls, ...staticPages];
}
