/**
 * Search API — Search posts by header, content, or tags
 */

import type { NewsItem, ApiResponseItem } from '@/types/news';
import { buildStrapiUrl, POPULATE_PARAMS, API_URL, apiFetch } from './api-config';
import { parseNewsItemMinimal } from './api-utils';

/** Supported search fields */
export type SearchField = 'header' | 'content' | 'tags';

/**
 * Searches for posts by various criteria.
 * For tag searches, performs a two-step lookup: find matching tags → find posts with those tags.
 *
 * @param searchQuery - Search term
 * @param searchBy    - Field to search in: 'header', 'content', or 'tags'
 * @returns Array of matching NewsItem objects
 */
export async function searchPosts(
  searchQuery: string,
  searchBy: SearchField = 'content',
): Promise<NewsItem[]> {
  try {
    let url: string;

    if (searchBy === 'tags') {
      url = await buildTagSearchUrl(searchQuery);
      if (!url) return [];
    } else {
      const filterField = searchBy === 'header' ? 'header' : 'content';
      url = buildStrapiUrl('/posts', {
        populate: POPULATE_PARAMS.POST_FULL,
        filters: {
          [`filters[${filterField}][$containsi]`]: encodeURIComponent(searchQuery),
        },
        sort: 'createdAt:desc',
        pagination: { start: 0, limit: 100 },
      });
    }

    const data = await apiFetch<{ data: ApiResponseItem[] }>(url);
    return data.data.map((item) => parseNewsItemMinimal(item));
  } catch (error) {
    console.error('[searchPosts] Search failed:', error);
    return [];
  }
}

/* ═══════════════════════════════════════════════════
   Internal Helpers
   ═══════════════════════════════════════════════════ */

interface TagResponse {
  documentId: string;
}

/**
 * Builds a URL for tag-based search.
 * First finds matching tag IDs, then constructs a filter for posts with those tags.
 *
 * @param query - Tag search term
 * @returns URL string, or empty string if no matching tags found
 */
async function buildTagSearchUrl(query: string): Promise<string> {
  const tagsUrl = buildStrapiUrl('/tags', {
    filters: {
      'filters[Tag][name][$containsi]': encodeURIComponent(query),
    },
  });

  const tagsData = await apiFetch<{ data: TagResponse[] }>(tagsUrl);
  const tagDocumentIds = tagsData.data?.map((tag) => tag.documentId) || [];

  if (tagDocumentIds.length === 0) {
    return '';
  }

  const filters = tagDocumentIds
    .map((id, index) => `filters[$or][${index}][tags][documentId][$eq]=${id}`)
    .join('&');

  return `${API_URL}/posts?${filters}&${POPULATE_PARAMS.POST_FULL.join('&')}&sort[0]=createdAt:desc&pagination[start]=0&pagination[limit]=100`;
}

// Backward-compatible export name
export { searchPosts as fetchPostsByDescription };