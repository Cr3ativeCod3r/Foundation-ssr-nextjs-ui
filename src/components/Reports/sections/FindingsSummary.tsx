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
      <FindingNumber value={finding.liczba} />
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

/** Two values joined by a connector ("3,00 vs 3,17", "48% i 33%") */
const PAIR_PATTERN = /^(.+?)\s+(vs\.?|i|oraz|lub|wobec)\s+(.+)$/i;

/** Key number; a pair of values goes on two lines with a smaller connector so it fits the narrow column */
function FindingNumber({ value }: { value: string }) {
  const pair = value.match(PAIR_PATTERN);
  const className = "report-display text-4xl leading-none tabular-nums text-teal-700 lg:text-[2.6rem]";

  if (!pair) return <p className={className + " whitespace-nowrap"}>{value}</p>;

  return (
    <p className={className}>
      <span className="block whitespace-nowrap">{pair[1]}</span>
      <span className="mt-1 block whitespace-nowrap">
        <small className="mr-1.5 text-[0.5em] font-semibold uppercase tracking-wide text-slate-500">{pair[2]}</small>
        {pair[3]}
      </span>
    </p>
  );
}

function valueLabel(value: number, unit?: string) {
  if (!unit) return formatNumber(value);
  // Polish style: "69%" without a space, other units with one ("13 mln zł")
  return unit === '%' ? `${formatNumber(value)}%` : `${formatNumber(value)} ${unit}`;
}

/** Horizontal bars, one per item; the last bar is highlighted */
function CompareChart({ data }: { data: ChartData }) {
  const points = data.pozycje!;
  const max = Math.max(...points.map((p) => Number(p.wartosc)));
  const label = points.map((p) => `${valueLabel(Number(p.wartosc), data.jednostka)} (${p.etykieta})`).join(', ');

  return (
    <div
      role="img"
      aria-label={data.opis ? `${data.opis}: ${label}` : label}
      className="mt-5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 text-xs sm:text-sm"
    >
      {/* Rows share the parent grid so the label column fits the longest label */}
      {points.map((point, index) => (
        <div key={`${point.etykieta}-${index}`} className="contents">
          <span className="font-semibold text-slate-500">{point.etykieta}</span>
          <i
            style={{ width: barWidth(Number(point.wartosc), max) }}
            className={`report-bar block h-3 rounded-full ${index === points.length - 1 ? 'bg-rose-600' : 'bg-teal-700'}`}
          />
          <b className="text-right tabular-nums">{valueLabel(Number(point.wartosc), data.jednostka)}</b>
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
