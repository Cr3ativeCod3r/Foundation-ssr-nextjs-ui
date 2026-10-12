import type { ReportContext, TableauEmbedBlock } from '@/types/reportSections';
import { mediaUrl, tableauUrls } from '@/utils/reportFormat';
import TableauFacade from './TableauFacade';
import { CONTAINER, EYEBROW, H2 } from './styles';

export const DASHBOARD_ANCHOR = 'eksploruj';

interface TableauDashboardProps extends TableauEmbedBlock {
  report: ReportContext;
}

/** report.tableau-embed — description next to the click-to-load Tableau dashboard */
export default function TableauDashboard({
  etykieta,
  naglowek,
  opis,
  punkty,
  tableauWidok,
  wysokoscDesktop,
  wysokoscMobile,
  miniatura,
  nota,
  report,
}: TableauDashboardProps) {
  if (!tableauWidok?.includes('/')) return null;

  const urls = tableauUrls(tableauWidok);
  const thumbnail = mediaUrl(miniatura?.url) ?? urls.image;

  return (
    <section id={DASHBOARD_ANCHOR} className="scroll-mt-24 border-y border-teal-100 bg-teal-50/60">
      <div
        className={`${CONTAINER} grid items-start gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12`}
      >
        <div className="lg:sticky lg:top-28">
          {etykieta && <p className={EYEBROW}>{etykieta}</p>}
          <h2 className={H2}>{naglowek}</h2>
          {opis && <p className="mt-5 text-lg leading-relaxed text-slate-600 md:text-xl">{opis}</p>}
          {punkty?.length > 0 && (
            <ul className="mt-6 grid list-disc gap-2 pl-5 text-sm font-semibold sm:text-base">
              {punkty.map((item) => (
                <li key={item.id}>{item.tekst}</li>
              ))}
            </ul>
          )}
          {nota && (
            <p className="mt-6 border-l-[3px] border-teal-700 bg-white/70 px-4 py-3 text-xs text-slate-600 sm:text-sm">
              {nota}
            </p>
          )}
        </div>

        {/* No overflow/fixed height here: the iframe is as tall as the dashboard */}
        <div className="min-w-0 overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-200">
          <TableauFacade
            slug={report.slug}
            title={`Dashboard: ${report.nazwa}`}
            embedUrl={urls.embed}
            standaloneUrl={urls.standalone}
            thumbnailUrl={thumbnail}
            thumbnailAlt={miniatura?.alternativeText || `Podgląd dashboardu: ${report.nazwa}`}
            heightDesktop={wysokoscDesktop || 1751}
            heightMobile={wysokoscMobile || 1170}
          />
        </div>
      </div>
    </section>
  );
}
