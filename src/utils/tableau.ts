/**
 * Helpers for Tableau Public embed codes pasted in Strapi.
 *
 * The embed code contains a <script>, which React would not execute, so instead
 * of injecting the raw HTML we pull out the view name and render an iframe.
 */

const TABLEAU_HOST = 'https://public.tableau.com';

/** Decodes HTML entities used by Tableau embed codes (e.g. &#47; → /) */
function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&');
}

/** Reads a <param name='…' value='…'> from the embed code */
function readParam(code: string, name: string): string | null {
  const match = code.match(new RegExp(`name=['"]${name}['"]\\s+value=['"]([^'"]*)['"]`, 'i'));
  return match ? decodeEntities(match[1]) : null;
}

/**
 * Returns the view path ("Workbook/Sheet") from an embed code or a plain
 * public.tableau.com/views/… link, or null when nothing usable is found.
 */
export function getTableauViewName(code: string): string | null {
  const fromParam = readParam(code, 'name');
  if (fromParam) return fromParam;

  const fromUrl = decodeEntities(code).match(/public\.tableau\.com\/(?:app\/profile\/[^/]+\/)?(?:viz|views)\/([^/?#'"\s]+\/[^/?#'"\s]+)/i);
  return fromUrl ? fromUrl[1] : null;
}

/** Builds the iframe URL for a Tableau Public view */
export function getTableauEmbedUrl(code: string): string | null {
  const viewName = getTableauViewName(code);
  if (!viewName) return null;

  const language = readParam(code, 'language') ?? 'en-US';
  const path = encodeViewPath(viewName);

  return `${TABLEAU_HOST}/views/${path}?:embed=y&:showVizHome=no&:tabs=no&:toolbar=yes&:animate_transition=yes&:display_count=yes&:language=${encodeURIComponent(language)}`;
}

/** Encodes a "Workbook/Sheet" view path for use in a URL */
function encodeViewPath(viewName: string): string {
  return viewName.split('/').map(encodeURIComponent).join('/');
}

/** Static PNG render of a Tableau Public view, used as a card thumbnail */
export function getTableauThumbnailUrl(code: string): string | null {
  const viewName = getTableauViewName(code);
  if (!viewName) return null;

  return `${TABLEAU_HOST}/views/${encodeViewPath(viewName)}.png?:display_static_image=y&:showVizHome=n`;
}

export interface TableauHeights {
  /** Height in px for containers wider than 800px (null → 4:3) */
  desktop: number | null;
  /** Height in px for containers up to 500px wide */
  mobile: number;
}

/**
 * Reads the viz heights from Tableau's sizing script, which sets a fixed height
 * for wide and narrow containers and 4:3 in between. The viz does not scroll
 * inside its iframe, so the frame must be this tall to show the whole dashboard.
 */
export function getTableauHeights(code: string): TableauHeights {
  const heights = [...code.matchAll(/style\.height\s*=\s*['"](\d+)px['"]/g)].map((m) => Number(m[1]));
  const wideFixed = /offsetWidth\s*>\s*800\s*\)\s*\{[^}]*style\.height\s*=\s*['"]\d+px/.test(code);

  return {
    desktop: wideFixed ? heights[0] : null,
    mobile: heights.length > 0 ? heights[heights.length - 1] : 770,
  };
}
