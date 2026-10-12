import type { CSSProperties } from 'react';
import { Download } from 'lucide-react';
import type { HeroBlock, PopulationCard, ReportContext } from '@/types/reportSections';
import { barWidth, isExternalUrl, pagesLabel } from '@/utils/reportFormat';
import { GlossaryButton, TrackedLink } from './client';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CONTAINER } from './styles';

interface ReportHeroProps extends HeroBlock {
  report: ReportContext;
}

/** report.hero — H1, lead, CTA buttons, meta list and the "Ile osób choruje?" card */
export default function ReportHero({ eyebrow, tytul, lead, meta, kartaLiczb, report }: ReportHeroProps) {
  const metaItems = [...(meta ?? [])];
  if (report.liczbaStron || report.pdf) {
    metaItems.push({
      id: -1,
      etykieta: 'Pełny raport',
      wartosc: [report.liczbaStron && pagesLabel(report.liczbaStron), report.pdf && 'PDF'].filter(Boolean).join(', '),
    });
  }

  return (
    <section
      id="start"
      className={`${CONTAINER} grid items-center gap-10 pb-16 pt-8 md:pb-20 md:pt-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:gap-16 xl:gap-20`}
    >
      <div>
        {eyebrow && (
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-teal-700 sm:text-sm">{eyebrow}</p>
        )}
        <h1 className="report-display max-w-[11ch] text-[2.8rem] font-medium leading-none tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl xl:text-[6.2rem]">
          {tytul}
        </h1>
        {lead && (
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-slate-600 text-pretty md:text-xl">{lead}</p>
        )}

        {(report.pdf || report.dashboardAnchor) && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {report.pdf && (
              <TrackedLink
                href={report.pdf.url}
                download
                event="report_pdf_download"
                slug={report.slug}
                className={BUTTON_PRIMARY}
              >
                <Download size={18} aria-hidden />
                Pobierz pełny raport (PDF)
              </TrackedLink>
            )}
            {report.dashboardAnchor && (
              <a href={`#${report.dashboardAnchor}`} className={BUTTON_SECONDARY}>
                Zobacz dane interaktywne
              </a>
            )}
          </div>
        )}

        {metaItems.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-200 pt-5 sm:flex sm:flex-wrap sm:gap-x-10">
            {metaItems.map((item) => (
              <div key={item.id}>
                <dt className="text-xs font-bold uppercase tracking-[0.06em] text-slate-500">{item.etykieta}</dt>
                <dd className="mt-1 text-sm font-semibold sm:text-base">{item.wartosc}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {kartaLiczb && <PopulationCardFigure card={kartaLiczb} hasGlossary={report.hasGlossary} />}
    </section>
  );
}

/** report.population-card — dark card with proportional bars */
function PopulationCardFigure({ card, hasGlossary }: { card: PopulationCard; hasGlossary: boolean }) {
  const items = card.pozycje ?? [];
  const max = Math.max(...items.map((item) => Number(item.wartoscLiczba) || 0));

  return (
    <figure
      aria-labelledby="population-card-title"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 p-6 text-white shadow-2xl shadow-teal-950/20 sm:p-8 lg:p-10"
    >
      <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl" />

      <div className="relative">
        {card.nadtytul && (
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-rose-300">{card.nadtytul}</p>
        )}
        <h2 id="population-card-title" className="report-display mt-2 text-3xl font-medium leading-tight lg:text-[2.4rem]">
          {card.tytul}
        </h2>

        <ol className="mt-8 grid gap-5">
          {items.map((item, index) => {
            const own = Boolean(item.daneRaportu);
            const barStyle = {
              width: barWidth(Number(item.wartoscLiczba), max),
              animationDelay: `${index * 120}ms`,
            } as CSSProperties;

            return (
              <li key={item.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <strong
                    className={`report-display text-2xl font-medium tabular-nums ${own ? 'text-rose-300' : 'text-white'}`}
                  >
                    {item.wartoscTekst}
                  </strong>
                  {item.zrodloEtykieta && (
                    <SourceTag label={item.zrodloEtykieta} url={item.zrodloUrl} own={own} />
                  )}
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
                  <i
                    style={barStyle}
                    className={`report-bar block h-full rounded-full ${
                      own
                        ? 'bg-rose-400'
                        : item.szacunek
                          ? 'bg-[repeating-linear-gradient(135deg,#5eead4_0_6px,#2dd4bf_6px_12px)]'
                          : 'bg-teal-300'
                    }`}
                  />
                </div>
                {item.opis && <p className="mt-1 text-xs text-white/75 sm:text-sm">{item.opis}</p>}
              </li>
            );
          })}
        </ol>

        {(card.nota || hasGlossary) && (
          <figcaption className="mt-8 border-t border-white/20 pt-5 text-sm text-white/85 sm:text-base">
            {card.nota}{' '}
            {hasGlossary && (
              <GlossaryButton className="font-bold text-white underline underline-offset-4 hover:text-teal-200">
                Jak czytać te liczby?
              </GlossaryButton>
            )}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

function SourceTag({ label, url, own }: { label: string; url: string | null; own: boolean }) {
  const className = `whitespace-nowrap rounded-full border px-2 py-0.5 text-[0.7rem] font-semibold ${
    own ? 'border-rose-300 text-rose-200' : 'border-white/30 text-white/80'
  }`;

  if (!url) return <span className={className}>{label}</span>;

  return (
    <a
      href={url}
      className={`${className} transition hover:border-white hover:text-white`}
      {...(isExternalUrl(url) && { target: '_blank', rel: 'noopener noreferrer' })}
      title={`Źródło: ${label}`}
    >
      {label}
    </a>
  );
}
