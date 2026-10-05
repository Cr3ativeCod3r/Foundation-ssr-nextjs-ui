/**
 * Report types — Strapi "Raporty" collection
 */

import type { PaginationMeta } from './common';

/** Single report as returned by Strapi */
export interface Report {
  id: number;
  documentId: string;
  /** Report date (YYYY-MM-DD) */
  data: string;
  nazwa: string;
  slug: string;
  /** Raw Tableau embed code pasted in Strapi */
  kod: string;
}

export interface ReportsResponse {
  data: Report[];
  meta: {
    pagination: PaginationMeta;
  };
}
