import type { CSSProperties } from 'react';
import { BarChart3 } from 'lucide-react';
import { getTableauEmbedUrl, getTableauHeights } from '@/utils/tableau';

interface TableauEmbedProps {
  code: string;
  title: string;
}

/**
 * Renders a Tableau Public view from the embed code stored in Strapi.
 * Fills its (flex) parent and scrolls vertically: the iframe gets the full
 * dashboard height from the embed code, since Tableau does not scroll inside it.
 */
export default function TableauEmbed({ code, title }: TableauEmbedProps) {
  const src = getTableauEmbedUrl(code);

  if (!src) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 text-center text-slate-500">
        <BarChart3 size={36} className="mb-3 text-slate-300" />
        Nie udało się wczytać wizualizacji tego raportu.
      </div>
    );
  }

  const { desktop, mobile } = getTableauHeights(code);
  const style = {
    '--viz-h-mobile': `${mobile}px`,
    ...(desktop && { '--viz-h-desktop': `${desktop}px` }),
  } as CSSProperties;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        style={style}
        className={`block w-full border-0 h-[var(--viz-h-mobile)] min-[520px]:h-auto min-[520px]:aspect-[4/3]
          ${desktop ? 'min-[820px]:aspect-auto min-[820px]:h-[var(--viz-h-desktop)]' : ''}`}
      />
    </div>
  );
}
