/**
 * Reports API — Fetch report list and single reports
 */

import type { Report, ReportsResponse } from '@/types/report';
import { buildStrapiUrl, apiFetch } from './api-config';

export const REPORTS_PAGE_SIZE = 10;

/**
 * Only "produkcja" reports are listed (homepage, /raporty, navbar).
 * "test" reports stay reachable by their URL only.
 */
const PRODUCTION_FILTER = { 'filters[tryb][$eq]': 'produkcja' } as const;

/* ═══════════════════════════════════════════════════
   Report List
   ═══════════════════════════════════════════════════ */

/**
 * Fetches a page of reports, newest first.
 *
 * @param page     - Page number (1-based)
 * @param pageSize - Reports per page
 * @returns Reports with pagination metadata
 */
export async function fetchReports(
  page: number = 1,
  pageSize: number = REPORTS_PAGE_SIZE,
): Promise<ReportsResponse> {
  const url = buildStrapiUrl('/raporty', {
    filters: PRODUCTION_FILTER,
    sort: ['data:desc', 'createdAt:desc'],
    pagination: { page, pageSize },
  });

  return apiFetch<ReportsResponse>(url, { cache: 'no-store' });
}

/* ═══════════════════════════════════════════════════
   Single Report
   ═══════════════════════════════════════════════════ */

/**
 * Fetches a single report by its URL slug.
 *
 * @param slug - Report URL slug
 * @returns Report or null when not found
 */
export async function fetchReportBySlug(slug: string): Promise<Report | null> {
  const url = buildStrapiUrl('/raporty', {
    filters: {
      'filters[slug][$eq]': encodeURIComponent(slug),
    },
  });

  const data = await apiFetch<{ data: Report[] }>(url, { cache: 'no-store' });
  return data.data[0] ?? null;
}

/* ═══════════════════════════════════════════════════
   Latest Reports (homepage)
   ═══════════════════════════════════════════════════ */

/**
 * Fetches the newest reports for the homepage. Never throws.
 *
 * @param limit - Number of reports to return
 */
export async function fetchLatestReports(limit: number = 3): Promise<Pick<Report, 'id' | 'nazwa' | 'slug' | 'data'>[]> {
  const url = buildStrapiUrl('/raporty', {
    fields: ['nazwa', 'slug', 'data'],
    filters: PRODUCTION_FILTER,
    sort: ['data:desc', 'createdAt:desc'],
    pagination: { page: 1, pageSize: limit },
  });

  try {
    // Always read fresh data so added/removed reports show up immediately
    const response = await apiFetch<ReportsResponse>(url, { cache: 'no-store' });
    return response.data;
  } catch (error) {
    console.error('[fetchLatestReports] Failed to fetch reports:', error);
    return [];
  }
}

/**
 * Checks whether at least one production report is published. Never throws.
 */
export async function hasReports(): Promise<boolean> {
  const url = buildStrapiUrl('/raporty', {
    fields: ['slug'],
    filters: PRODUCTION_FILTER,
    pagination: { page: 1, pageSize: 1 },
  });

  try {
    const response = await apiFetch<ReportsResponse>(url, { cache: 'no-store' });
    return response.meta.pagination.total > 0;
  } catch (error) {
    console.error('[hasReports] Failed to fetch reports:', error);
    return false;
  }
}
