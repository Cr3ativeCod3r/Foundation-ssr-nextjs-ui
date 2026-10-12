import Link from 'next/link';
import { Source_Serif_4 } from 'next/font/google';
import { BookOpen } from 'lucide-react';
import type { ReportContext, ReportPageData } from '@/types/reportSections';
import { formatFileSize, mediaUrl } from '@/utils/reportFormat';
import { GlossaryButton, GlossaryDialog } from './client';
import ReportSections from './ReportSections';
import { DASHBOARD_ANCHOR } from './TableauDashboard';
import { CONTAINER } from './styles';
import './report.css';

const displayFont = Source_Serif_4({
  variable: '--font-report-display',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

/** Report-level data shared by all sections */
export function buildReportContext(report: ReportPageData): ReportContext {
  const pdfUrl = mediaUrl(report.plikPdf?.url);
  const sekcje = report.sekcje ?? [];
  const hasDashboard = sekcje.some((b) => b.__component === 'report.tableau-embed');

  return {
    slug: report.slug,
    nazwa: report.nazwa,
    pdf: pdfUrl && report.plikPdf ? { url: pdfUrl, sizeLabel: `PDF, ${formatFileSize(report.plikPdf.size)}` } : null,
    liczbaStron: report.liczbaStron ?? null,
    hasGlossary: (report.slowniczek?.length ?? 0) > 0,
    dashboardAnchor: hasDashboard ? DASHBOARD_ANCHOR : null,
  };
}

/** Report page built from Strapi sections (variant A) */
export default function ReportArticle({ report, jsonLd }: { report: ReportPageData; jsonLd: object }) {
  const context = buildReportContext(report);

  return (
    <article
      className={`${displayFont.variable} report-page bg-[var(--color-surface)] pb-12 text-slate-900 lg:pb-24`}
    >
      <script
        type="application/ld+json"
        // JSON-LD must be inline; content comes from our own CMS and is escaped below
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <div className={`${CONTAINER} flex flex-wrap items-center justify-between gap-3 pt-6 md:pt-8`}>
        <nav aria-label="Ścieżka" className="flex gap-2 text-xs text-slate-500 sm:text-sm">
          <Link href="/raporty" className="font-semibold text-teal-700 hover:text-teal-800 hover:underline">
            Raporty
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{report.nazwa}</span>
        </nav>
        {context.hasGlossary && (
          <GlossaryButton className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-xs font-bold ring-1 ring-slate-200 transition hover:bg-slate-900 hover:text-white sm:text-sm">
            <BookOpen size={16} aria-hidden />
            Jak czytać dane?
          </GlossaryButton>
        )}
      </div>

      <ReportSections sekcje={report.sekcje ?? []} report={context} />

      {context.hasGlossary && <GlossaryDialog terms={report.slowniczek!} />}
    </article>
  );
}
