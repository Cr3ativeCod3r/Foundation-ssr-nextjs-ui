/**
 * Reports API — Fetch report list and single reports
 */

import type { Report, ReportsResponse } from '@/types/report';
import { buildStrapiUrl, apiFetch } from './api-config';

export const REPORTS_PAGE_SIZE = 10;

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

/** Homepage list is cached — new reports show up within 10 minutes */
const LATEST_REPORTS_REVALIDATE = 600;

/**
 * Fetches the newest reports for the homepage. Never throws.
 *
 * @param limit - Number of reports to return
 */
export async function fetchLatestReports(limit: number = 3): Promise<Pick<Report, 'id' | 'nazwa' | 'slug' | 'data'>[]> {
  const url = buildStrapiUrl('/raporty', {
    fields: ['nazwa', 'slug', 'data'],
    sort: ['data:desc', 'createdAt:desc'],
    pagination: { page: 1, pageSize: limit },
  });

  try {
    const response = await apiFetch<ReportsResponse>(url, {
      next: { revalidate: LATEST_REPORTS_REVALIDATE },
    });
    return response.data;
  } catch (error) {
    console.error('[fetchLatestReports] Failed to fetch reports:', error);
    return [];
  }
}
