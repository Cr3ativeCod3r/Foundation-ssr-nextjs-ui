/**
 * Locations API — Facilities shown on /mapa
 */

import type { PaginatedResponse } from '@/types/common';
import type { MapLocation } from '@/types/location';
import { buildStrapiUrl, apiFetch } from './api-config';

/** Strapi's REST maxLimit */
const PAGE_SIZE = 100;

/** Locations change rarely — refresh the cached list at most once an hour */
export const LOCATIONS_REVALIDATE = 3600;

const FIELDS = ['nazwa', 'oddzial', 'placowka', 'adres', 'miasto', 'telefon', 'lat', 'lng', 'choroby', 'rodzaje'];

function fetchLocationsPage(page: number) {
  const url = buildStrapiUrl('/lokalizacje', {
    fields: FIELDS,
    sort: ['miasto:asc', 'nazwa:asc'],
    pagination: { page, pageSize: PAGE_SIZE },
  });

  return apiFetch<PaginatedResponse<MapLocation>>(url, {
    next: { revalidate: LOCATIONS_REVALIDATE },
  });
}

/**
 * Fetches every location (all pages in parallel after the first one).
 *
 * @returns All facilities, sorted by city and name
 */
export async function fetchLocations(): Promise<MapLocation[]> {
  const first = await fetchLocationsPage(1);
  const { pageCount } = first.meta.pagination;

  const rest = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, i) => fetchLocationsPage(i + 2)),
  );

  return [first, ...rest].flatMap((response) => response.data);
}
