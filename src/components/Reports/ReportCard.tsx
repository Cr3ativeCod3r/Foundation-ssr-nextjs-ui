import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { ArrowRight, BarChart3, Calendar, MousePointerClick, Sparkles } from 'lucide-react';
import type { Report } from '@/types/report';
import { getTableauThumbnailUrl } from '@/utils/tableau';

interface ReportCardProps {
  report: Report;
  /** Wide, horizontal layout used for the newest report */
  featured?: boolean;
}

/** Card linking to a single report, with a Tableau thumbnail preview */
export default function ReportCard({ report, featured = false }: ReportCardProps) {
  const date = parseISO(report.data);
  const thumbnail = getTableauThumbnailUrl(report.kod);

  return (
    <Link
      href={`/raporty/${report.slug}`}
      className={`group relative flex overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-sm
        transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/10
        ${featured ? 'flex-col md:flex-row' : 'flex-col'}`}
    >
      {/* Preview — gradient + pattern stays visible if the thumbnail fails to load */}
      <div
        className={`relative shrink-0 overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800
          ${featured ? 'aspect-[16/10] md:aspect-auto md:w-[55%] md:min-h-[320px]' : 'aspect-[16/10]'}`}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <BarChart3
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/25"
          size={featured ? 96 : 72}
          strokeWidth={1.25}
        />
        {thumbnail && (
          <div
            aria-hidden
            className="absolute inset-0 bg-white bg-cover bg-top transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url("${thumbnail}")` }}
          />
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

        {featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-rose-900/20">
            <Sparkles size={13} />
            Najnowszy raport
          </span>
        )}

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
          <MousePointerClick size={13} className="text-teal-600" />
          Interaktywna wizualizacja
        </span>
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col ${featured ? 'p-6 md:p-10 md:justify-center' : 'p-5 sm:p-6'}`}>
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-600 ring-1 ring-teal-100">
            <BarChart3 size={15} />
          </span>
          Raport
        </div>

        <h2
          className={`font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-700
            ${featured ? 'text-2xl md:text-3xl mb-4' : 'text-lg mb-3 line-clamp-2'}`}
        >
          {report.nazwa}
        </h2>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={15} className="text-slate-400" />
          <time dateTime={report.data}>{format(date, 'd MMMM yyyy', { locale: pl })}</time>
        </div>

        <div className={`flex items-center ${featured ? 'mt-8' : 'mt-auto pt-6'}`}>
          <span
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300
              ${featured
                ? 'rounded-full bg-teal-600 px-5 py-2.5 text-white shadow-md shadow-teal-600/25 group-hover:bg-teal-700 group-hover:gap-3'
                : 'text-teal-700 group-hover:gap-3'}`}
          >
            Zobacz raport
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
