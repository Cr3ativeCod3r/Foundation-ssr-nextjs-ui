import { MetadataRoute } from "next";

const disallow = ["/admin", "/api", "/dashboard", "/private"];

// AI search and assistant crawlers, listed explicitly so the site can be cited in their answers
const aiBots = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://chorobymozgu.pl";

  return {
    rules: [
      { userAgent: "*", allow: ["/"], disallow },
      { userAgent: aiBots, allow: ["/"], disallow },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
