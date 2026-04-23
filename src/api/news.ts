/**
 * News API — Fetch posts, single posts, and random suggestions
 */

import type { NewsItem, ApiResponseItem } from '@/types/news';
import { buildStrapiUrl, POPULATE_PARAMS, apiFetch } from './api-config';
import { parseNewsItem, parseNewsItemMinimal } from './api-utils';

/* ═══════════════════════════════════════════════════
   Latest News
   ═══════════════════════════════════════════════════ */

/**
 * Fetches the latest news posts with offset-based pagination.
 *
 * @param start - Starting index (0-based offset)
 * @param limit - Maximum number of posts to return
 * @returns Array of parsed NewsItem objects
 */
export async function fetchLatestNews(
  start: number = 0,
  limit: number = 5,
): Promise<NewsItem[]> {
  const url = buildStrapiUrl('/posts', {
    populate: POPULATE_PARAMS.POST_STANDARD,
    sort: 'createdAt:desc',
    pagination: { start, limit },
  });

  try {
    const data = await apiFetch<{ data: ApiResponseItem[] }>(url);
    return data.data.map((item) => parseNewsItemMinimal(item));
  } catch (error) {
    console.error('[fetchLatestNews] Failed to fetch latest news:', error);
    return [];
  }
}

/* ═══════════════════════════════════════════════════
   Single Post
   ═══════════════════════════════════════════════════ */

/**
 * Fetches a single post by its URL slug.
 * Returns full post data including content, author, and gallery.
 *
 * @param slug - Post URL slug
 * @returns Fully parsed NewsItem
 * @throws When post is not found or request fails
 */
export async function fetchPostBySlug(slug: string): Promise<NewsItem> {
  const url = buildStrapiUrl('/posts', {
    populate: POPULATE_PARAMS.POST_FULL,
    filters: {
      'filters[slug][$eq]': slug,
    },
  });

  const data = await apiFetch<{ data: ApiResponseItem[] }>(url);

  if (!data.data || data.data.length === 0) {
    throw new Error(`Post not found: ${slug}`);
  }

  return parseNewsItem(data.data[0]);
}

/* ═══════════════════════════════════════════════════
   Random / Related Posts
   ═══════════════════════════════════════════════════ */

/**
 * Fetches random posts, excluding a specific post by ID.
 * Used for "Related Posts" / "See Also" sections.
 *
 * @param excludeId - Post ID to exclude from results
 * @param _start    - Unused, kept for API compatibility
 * @param limit     - Number of random posts to return
 * @returns Array of randomly selected NewsItem objects
 */
export async function fetchRandomNews(
  excludeId: number,
  _start: number = 0,
  limit: number = 5,
): Promise<NewsItem[]> {
  const url = buildStrapiUrl('/posts', {
    populate: POPULATE_PARAMS.POST_STANDARD,
    filters: {
      'filters[id][$ne]': excludeId,
    },
    sort: 'createdAt:desc',
    pagination: { start: 0, limit: 50 },
  });

  try {
    const data = await apiFetch<{ data: ApiResponseItem[] }>(url);

    // Fisher-Yates shuffle for unbiased random selection
    const items = [...data.data];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items.slice(0, limit).map((item) => parseNewsItemMinimal(item));
  } catch (error) {
    console.error('[fetchRandomNews] Failed to fetch random news:', error);
    return [];
  }
}