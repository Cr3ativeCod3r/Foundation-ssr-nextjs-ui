import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://chorobymozgu.pl";

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

  const categoryUrls = categories.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    "mapa",
    "o-nas",
    "projekty",
    "statut",
    "kontakt",
    "search"
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const mainPage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  };

  return [mainPage, ...staticPages, ...categoryUrls];
}