/**
 * Formatting helpers for the report page (variant A)
 */

import { DOMAIN_URL } from '@/api/api-config';

/** Absolute URL of a Strapi upload (Strapi returns /uploads/… paths) */
export function mediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.startsWith('http') ? url : `${DOMAIN_URL}${url}`;
}

/** "4,2 MB" from Strapi's file size in kB */
export function formatFileSize(sizeKb: number): string {
  if (sizeKb < 1024) return `${Math.max(1, Math.round(sizeKb))} kB`;
  const mb = sizeKb / 1024;
  return `${mb.toLocaleString('pl-PL', { maximumFractionDigits: 1 })} MB`;
}

/** "20 202" — Polish thousands separator */
export function formatNumber(value: number): string {
  return value.toLocaleString('pl-PL');
}

/** "1 strona", "3 strony", "48 stron" */
export function pagesLabel(count: number): string {
  if (count === 1) return '1 strona';
  const lastDigit = count % 10;
  const lastTwo = count % 100;
  const few = lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14);
  return `${count} ${few ? 'strony' : 'stron'}`;
}

/** Width in % of a bar relative to the largest value (min 1% so it stays visible) */
export function barWidth(value: number, max: number): string {
  if (!max || !Number.isFinite(value)) return '0%';
  return `${Math.max(1, (value / max) * 100).toFixed(1)}%`;
}

/** Public Tableau view URLs built from "Workbook/Sheet" */
export function tableauUrls(view: string) {
  const path = view
    .trim()
    .split('/')
    .map(encodeURIComponent)
    .join('/');
  const base = `https://public.tableau.com/views/${path}`;

  return {
    embed: `${base}?:embed=y&:showVizHome=no&:tabs=no&:toolbar=yes&:language=pl-PL`,
    standalone: `${base}?:showVizHome=no&:language=pl-PL`,
    image: `${base}.png?:display_static_image=y&:showVizHome=n`,
  };
}

/** Treats internal paths and mailto: as same-window links */
export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
