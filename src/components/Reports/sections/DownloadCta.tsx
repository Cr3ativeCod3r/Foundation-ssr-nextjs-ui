import { Download, ExternalLink } from 'lucide-react';
import type { DownloadCtaBlock, ReportContext } from '@/types/reportSections';
import { isExternalUrl } from '@/utils/reportFormat';
import { TrackedLink } from './client';
import { BUTTON_GHOST, BUTTON_ON_DARK, CONTAINER } from './styles';

interface DownloadCtaProps extends DownloadCtaBlock {
  report: ReportContext;
}

/** report.download-cta — dark closing card with the PDF button and table of contents */
export default function DownloadCta({ etykieta, naglowek, opis, spisTresci, linkInteraktywny, report }: DownloadCtaProps) {
  const toc = spisTresci ?? [];
  const hasActions = Boolean(report.pdf || linkInteraktywny);

  return (
    <section id="raport" className={`${CONTAINER} scroll-mt-24 pt-16 md:pt-24`}>
      <div
        className={`relative grid gap-10 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 p-8 text-white shadow-2xl shadow-teal-950/20 sm:p-10 lg:p-16 ${
          toc.length > 0 ? 'lg:grid-cols-[1.2fr_0.8fr] lg:gap-12' : ''
        }`}
      >
        <div aria-hidden className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl" />

        <div className="relative">
          {etykieta && (
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-rose-300 sm:text-sm">{etykieta}</p>
          )}
          <h2 className="report-display max-w-[20ch] text-[2.2rem] font-medium leading-[1.04] tracking-[-0.025em] text-balance md:text-5xl">
            {naglowek}
          </h2>
          {opis && <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-white/80 md:text-xl">{opis}</p>}

          {hasActions && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {report.pdf && (
                <TrackedLink
                  href={report.pdf.url}
                  download
                  event="report_pdf_download"
                  slug={report.slug}
                  className={BUTTON_ON_DARK}
                >
                  <Download size={18} aria-hidden />
                  Pobierz PDF ({report.pdf.sizeLabel})
                </TrackedLink>
              )}
              {linkInteraktywny && (
                <a
                  href={linkInteraktywny}
                  className={BUTTON_GHOST}
                  {...(isExternalUrl(linkInteraktywny) && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  Otwórz raport interaktywny
                  {isExternalUrl(linkInteraktywny) && (
                    <>
                      <ExternalLink size={16} aria-hidden />
                      <span className="sr-only">(otwiera się w nowej karcie)</span>
                    </>
                  )}
                </a>
              )}
            </div>
          )}
        </div>

        {toc.length > 0 && (
          <div className="relative self-end border-t border-white/20 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-xs font-bold uppercase tracking-[0.06em] text-white/70 sm:text-sm">W raporcie</p>
            <ol className="mt-4 grid list-decimal gap-3 pl-5 text-sm marker:font-bold marker:text-rose-300 sm:text-base">
              {toc.map((item) => (
                <li key={item.id}>{item.tekst}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
