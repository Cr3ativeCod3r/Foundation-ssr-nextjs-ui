/**
 * Categories API — Fetch categories and category-specific posts
 */

import type { ApiResponseItem, Category, PostsResponse } from '@/types/news';
import { buildStrapiUrl, POPULATE_PARAMS, DOMAIN_URL, apiFetch } from './api-config';
import { parseNewsItemMinimal } from './api-utils';

/* ═══════════════════════════════════════════════════
   All Categories
   ═══════════════════════════════════════════════════ */

/**
 * Fetches all categories with their cover images.
 *
 * @returns Array of Category objects with resolved image URLs
 */
export async function fetchCategories(): Promise<Category[]> {
  const url = buildStrapiUrl('/categories', {
    populate: POPULATE_PARAMS.CATEGORY,
  });

  try {
    const data = await apiFetch<{ data: Category[] }>(url);

    return data.data.map((category) => ({
      name: category.name,
      slug: category.slug,
      imageUrl: category?.cover_image?.url
        ? `${DOMAIN_URL}${category.cover_image.url}`
        : '',
    }));
  } catch (error) {
    console.error('[fetchCategories] Failed to fetch categories:', error);
    return [];
  }
}

/* ═══════════════════════════════════════════════════
   Category Posts (Paginated)
   ═══════════════════════════════════════════════════ */

/**
 * Fetches posts for a specific category with page-based pagination.
 *
 * @param slug     - Category URL slug
 * @param page     - Page number (1-indexed)
 * @param pageSize - Number of posts per page
 * @returns Paginated response with posts and metadata
 * @throws When the API request fails
 */
export async function fetchCategoryPosts(
  slug: string,
  page: number = 1,
  pageSize: number = 12,
): Promise<PostsResponse> {
  const url = buildStrapiUrl('/posts', {
    populate: POPULATE_PARAMS.POST_STANDARD,
    filters: {
      'filters[category][slug][$eq]': slug,
    },
    sort: 'createdAt:desc',
    pagination: { page, pageSize },
  });

  const response = await apiFetch<{
    data: ApiResponseItem[];
    meta: PostsResponse['meta'];
  }>(url);

  return {
    data: response.data.map((item) => parseNewsItemMinimal(item)),
    meta: response.meta,
  };
}

/* ═══════════════════════════════════════════════════
   Single Category
   ═══════════════════════════════════════════════════ */

/** Shape returned by fetchCategoryBySlug */
export interface CategoryInfo {
  id: number;
  name: string;
  slug: string;
}

/**
 * Fetches a single category by its slug.
 *
 * @param slug - Category URL slug
 * @returns Category info or null if not found
 */
export async function fetchCategoryBySlug(slug: string): Promise<CategoryInfo | null> {
  const url = buildStrapiUrl('/categories', {
    populate: POPULATE_PARAMS.CATEGORY,
    filters: {
      'filters[slug][$eq]': slug,
    },
  });

  try {
    const response = await apiFetch<{ data: (CategoryInfo & Record<string, unknown>)[] }>(url);

    if (response.data.length === 0) {
      return null;
    }

    const raw = response.data[0];
    return {
      id: raw.id,
      name: raw.name,
      slug: raw.slug,
    };
  } catch (error) {
    console.error('[fetchCategoryBySlug] Failed to fetch category:', error);
    return null;
  }
}