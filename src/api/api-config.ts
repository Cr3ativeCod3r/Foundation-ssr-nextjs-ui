/**
 * Centralized API configuration, URL builder, and fetch utilities
 */

import type { ApiError } from '@/types/common';

/* ═══════════════════════════════════════════════════
   Environment Config
   ═══════════════════════════════════════════════════ */

export const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
export const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;

/* ═══════════════════════════════════════════════════
   Populate Parameters for Strapi Queries
   ═══════════════════════════════════════════════════ */

export const POPULATE_PARAMS = {
  /** Standard post fields: category + image + tags */
  POST_STANDARD: [
    'populate[category][populate]=cover_image',
    'populate=image',
    'populate[tags][populate]=*',
  ],

  /** Full post fields: category + image + tags + gallery + author */
  POST_FULL: [
    'populate[category][populate]=cover_image',
    'populate=image',
    'populate[tags][populate]=*',
    'populate[gallery][populate]=*',
    'populate[author][populate]=*',
  ],

  /** Category with all nested fields */
  CATEGORY: ['populate=*'],
} as const;

/* ═══════════════════════════════════════════════════
   URL Builder
   ═══════════════════════════════════════════════════ */

interface StrapiQueryParams {
  populate?: readonly string[];
  filters?: Record<string, string | number>;
  sort?: string | string[];
  pagination?: {
    start?: number;
    limit?: number;
    page?: number;
    pageSize?: number;
  };
}

/**
 * Builds a complete Strapi API URL with query parameters.
 *
 * @param endpoint - API endpoint path (e.g. '/posts')
 * @param params   - Query parameters to include
 * @returns Fully qualified URL string
 */
export function buildStrapiUrl(
  endpoint: string,
  params: StrapiQueryParams = {},
): string {
  const queryParts: string[] = [];

  if (params.populate) {
    queryParts.push(...params.populate);
  }

  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      queryParts.push(`${key}=${value}`);
    });
  }

  if (params.sort) {
    const sortParams = Array.isArray(params.sort) ? params.sort : [params.sort];
    sortParams.forEach((sortParam, index) => {
      queryParts.push(`sort[${index}]=${sortParam}`);
    });
  }

  if (params.pagination) {
    Object.entries(params.pagination).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParts.push(`pagination[${key}]=${value}`);
      }
    });
  }

  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  return `${API_URL}${endpoint}${queryString}`;
}

/* ═══════════════════════════════════════════════════
   Fetch Wrapper with Error Handling
   ═══════════════════════════════════════════════════ */

/**
 * Type-safe fetch wrapper with automatic JSON parsing and error handling.
 *
 * @param url     - Full URL to fetch
 * @param options - Optional RequestInit overrides
 * @returns Parsed JSON response
 * @throws {ApiError} When the request fails or returns non-2xx status
 */
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error: ApiError = {
        message: `API request failed: ${response.statusText}`,
        status: response.status,
      };
      throw error;
    }

    return await response.json();
  } catch (error) {
    if ((error as ApiError).status) {
      throw error;
    }

    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown API error',
    };
    throw apiError;
  }
}
