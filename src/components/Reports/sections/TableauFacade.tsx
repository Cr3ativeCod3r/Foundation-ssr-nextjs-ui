'use client';

import { useState, type CSSProperties } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

interface TableauFacadeProps {
  slug: string;
  title: string;
  embedUrl: string;
  standaloneUrl: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  heightDesktop: number;
  heightMobile: number;
}

/**
 * Thumbnail + "Uruchom dashboard" button; the Tableau iframe loads only after the click.
 * The iframe gets the dashboard's full height and its wrapper never scrolls,
 * so the page keeps a single scrollbar.
 */
export default function TableauFacade({
  slug,
  title,
  embedUrl,
  standaloneUrl,
  thumbnailUrl,
  thumbnailAlt,
  heightDesktop,
  heightMobile,
}: TableauFacadeProps) {
  const [loaded, setLoaded] = useState(false);

  function load() {
    setLoaded(true);
    trackEvent('report_dashboard_open', { slug });
  }

  if (loaded) {
    const style = {
      '--viz-h-mobile': `${heightMobile}px`,
      '--viz-h-desktop': `${heightDesktop}px`,
    } as CSSProperties;

    return (
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        allowFullScreen
        style={style}
        className="block h-[var(--viz-h-mobile)] w-full border-0 min-[801px]:h-[var(--viz-h-desktop)]"
      />
    );
  }

  return (
    <div className="relative grid min-h-96 place-items-center bg-slate-50 md:min-h-[32rem]">
      {/* eslint-disable-next-line @next/next/no-img-element -- Strapi or Tableau image, size unknown */}
      <img
        src={thumbnailUrl}
        alt={thumbnailAlt}
        loading="lazy"
        className="h-auto w-full max-w-[26rem] opacity-55 saturate-[.8]"
      />
      <div className="absolute inset-0 grid place-content-center justify-items-center gap-3 bg-gradient-to-b from-slate-50/20 to-slate-50/90 p-4 text-center">
        <button
          type="button"
          onClick={load}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-px hover:bg-teal-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-teal-600"
        >
          <Play size={16} aria-hidden fill="currentColor" />
          Uruchom dashboard
        </button>
        <a
          href={standaloneUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('report_dashboard_open', { slug })}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-slate-900 underline underline-offset-4 hover:text-teal-700"
        >
          Otwórz w nowym oknie
          <ExternalLink size={14} aria-hidden />
          <span className="sr-only">(otwiera się w nowej karcie)</span>
        </a>
      </div>
    </div>
  );
}
