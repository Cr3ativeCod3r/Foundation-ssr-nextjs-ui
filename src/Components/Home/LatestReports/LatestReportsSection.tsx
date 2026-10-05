import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { ArrowRight, BarChart3, ChevronRight, FileBarChart } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import type { Report } from '@/types/report';

interface LatestReportsSectionProps {
  reports: Pick<Report, 'id' | 'nazwa' | 'slug' | 'data'>[];
}

/** Compact, image-less list of the newest report(s) (homepage sidebar) */
export function LatestReportsSection({ reports }: LatestReportsSectionProps) {
  if (reports.length === 0) return null;

  return (
    <div className="mb-8">
      <SectionHeader title="Najnowszy raport" icon={<FileBarChart size={18} />} className="!mb-3" />

      <ul className="divide-y divide-gray-100">
        {reports.map((report) => (
          <li key={report.id}>
            <Link
              href={`/raporty/${report.slug}`}
              className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-slate-50"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600 ring-1 ring-teal-100 transition-colors group-hover:bg-teal-600 group-hover:text-white group-hover:ring-teal-600">
                <BarChart3 size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-800 transition-colors group-hover:text-teal-700">
                  {report.nazwa}
                </span>
                <span className="block text-[11px] text-slate-400">
                  {format(parseISO(report.data), 'd MMMM yyyy', { locale: pl })}
                </span>
              </span>
              <ChevronRight size={16} className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-600" />
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/raporty"
        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
      >
        Wszystkie raporty
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}
