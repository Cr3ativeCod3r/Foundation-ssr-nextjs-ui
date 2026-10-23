/**
 * Report page API — single report with the "sekcje" Dynamic Zone, PDF, SEO, glossary and sponsor
 */

import { cache } from 'react';
import type { ReportPageData } from '@/types/reportSections';
import { buildStrapiUrl, apiFetch } from './api-config';

/**
 * Strapi 5 populates each Dynamic Zone component separately (populate[sekcje][on][…]);
 * nested components (kartaLiczb.pozycje) need their own, deeper entry.
 */
const REPORT_PAGE_POPULATE = [
  'populate[plikPdf]=true',
  'populate[seo][populate]=*',
  'populate[sponsor][populate][logo]=true',
  'populate[slowniczek][sort][0]=kolejnosc:asc',
  'populate[slowniczek][sort][1]=termin:asc',
  'populate[sekcje][on][report.hero][populate][meta]=true',
  'populate[sekcje][on][report.hero][populate][kartaLiczb][populate][pozycje]=true',
  'populate[sekcje][on][report.findings-summary][populate]=*',
  'populate[sekcje][on][report.methodology][populate]=*',
  'populate[sekcje][on][report.tableau-embed][populate]=*',
  'populate[sekcje][on][report.download-cta][populate]=*',
  'populate[sekcje][on][report.partner-cta][populate]=*',
] as const;

/**
 * Fetches a report by slug with everything the report page renders.
 * Wrapped in React cache() so generateMetadata and the page share one request.
 *
 * @param slug - Report URL slug
 * @returns Report or null when not found
 */
export const fetchReportPage = cache(async (slug: string): Promise<ReportPageData | null> => {
  const url = buildStrapiUrl('/raporty', {
    populate: REPORT_PAGE_POPULATE,
    filters: {
      'filters[slug][$eq]': encodeURIComponent(slug),
    },
  });

  const data = await apiFetch<{ data: ReportPageData[] }>(url, { cache: 'no-store' });
  return data.data[0] ?? null;
});
