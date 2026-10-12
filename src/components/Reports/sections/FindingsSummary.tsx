import type { ChartData, Finding, FindingsSummaryBlock } from '@/types/reportSections';
import { barWidth, formatNumber } from '@/utils/reportFormat';
import { RichText } from './client';
import { CHAPTER_PADDING, CONTAINER, EYEBROW, H2, LEAD } from './styles';

/** Colors of the split bar segments, in order (first one is the highlighted category) */
const SPLIT_COLORS = ['bg-rose-600', 'bg-teal-700', 'bg-slate-400', 'bg-teal-300', 'bg-amber-500'];

/** report.findings-summary — sticky heading + list of key numbers with optional CSS bar charts */
export default function FindingsSummary({ etykieta, naglowek, wstep, wnioski }: FindingsSummaryBlock) {
  return (
    <section
      id="wnioski"
      className={`${CONTAINER} ${CHAPTER_PADDING} grid scroll-mt-24 gap-10 border-t border-slate-200 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}
    >
      <div className="self-start lg:sticky lg:top-28">
        {etykieta && <p className={EYEBROW}>{etykieta}</p>}
        <h2 className={H2}>{naglowek}</h2>
        {wstep && <p className={LEAD}>{wstep}</p>}
      </div>

      <div className="grid">
        {(wnioski ?? []).map((finding) => (
          <FindingItem key={finding.id} finding={finding} />
        ))}
      </div>
    </section>
  );
}

function FindingItem({ finding }: { finding: Finding }) {
  const points = (finding.daneWykresu?.pozycje ?? []).filter((p) => Number.isFinite(Number(p.wartosc)));

  return (
    <article className="grid gap-3 border-t border-slate-200 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
      <p className="report-display whitespace-nowrap text-4xl leading-none tabular-nums text-teal-700 lg:text-[2.6rem]">
        {finding.liczba}
      </p>
      <div>
        <h3 className="text-lg font-semibold leading-snug md:text-xl">{finding.tytul}</h3>
        {finding.opis && (
          <div className="mt-2 max-w-[70ch] text-sm text-slate-600 sm:text-base [&_a]:text-teal-700 [&_a]:underline [&_p+p]:mt-2">
            <RichText content={finding.opis} />
          </div>
        )}
        {finding.typWykresu === 'porownanie' && points.length > 0 && (
          <CompareChart data={finding.daneWykresu!} />
        )}
        {finding.typWykresu === 'podzial' && points.length > 0 && <SplitChart data={finding.daneWykresu!} />}
      </div>
    </article>
  );
}

function valueLabel(value: number, unit?: string) {
  return unit ? `${formatNumber(value)} ${unit}` : formatNumber(value);
}

/** Horizontal bars, one per item; the last bar is highlighted */
function CompareChart({ data }: { data: ChartData }) {
  const points = data.pozycje!;
  const max = Math.max(...points.map((p) => Number(p.wartosc)));
  const label = points.map((p) => `${valueLabel(Number(p.wartosc), data.jednostka)} (${p.etykieta})`).join(', ');

  return (
    <div role="img" aria-label={data.opis ? `${data.opis}: ${label}` : label} className="mt-5 grid gap-2">
      {points.map((point, index) => (
        <div
          key={`${point.etykieta}-${index}`}
          className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 text-xs sm:text-sm"
        >
          <span className="font-semibold text-slate-500">{point.etykieta}</span>
          <i
            style={{ width: barWidth(Number(point.wartosc), max) }}
            className={`report-bar block h-3 rounded-full ${index === points.length - 1 ? 'bg-rose-600' : 'bg-teal-700'}`}
          />
          <b className="min-w-[4.5rem] text-right tabular-nums">{valueLabel(Number(point.wartosc), data.jednostka)}</b>
        </div>
      ))}
    </div>
  );
}

/** One stacked bar showing shares of a total, with a legend */
function SplitChart({ data }: { data: ChartData }) {
  const points = data.pozycje!;
  const total = points.reduce((sum, p) => sum + Number(p.wartosc), 0);
  const label = points.map((p) => `${p.etykieta} ${valueLabel(Number(p.wartosc), data.jednostka)}`).join(', ');

  return (
    <>
      <div
        role="img"
        aria-label={data.opis ? `${data.opis}: ${label}` : label}
        className="mt-5 flex h-4 gap-0.5 overflow-hidden rounded-full"
      >
        {points.map((point, index) => (
          <i
            key={`${point.etykieta}-${index}`}
            style={{ width: barWidth(Number(point.wartosc), total) }}
            className={`block h-full ${SPLIT_COLORS[index % SPLIT_COLORS.length]}`}
          />
        ))}
      </div>
      <ul aria-hidden className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600 sm:text-sm">
        {points.map((point, index) => (
          <li key={`${point.etykieta}-${index}`} className="flex items-center gap-2">
            <i className={`h-2.5 w-2.5 shrink-0 rounded-full ${SPLIT_COLORS[index % SPLIT_COLORS.length]}`} />
            {point.etykieta} {valueLabel(Number(point.wartosc), data.jednostka)}
          </li>
        ))}
      </ul>
    </>
  );
}
