import type { ReportSponsor as ReportSponsorData } from '@/types/reportSections';
import { mediaUrl } from '@/utils/reportFormat';
import { CONTAINER } from './styles';

/** Sponsor logo at the bottom of the report (Strapi field "sponsor") */
export default function ReportSponsor({ sponsor }: { sponsor: ReportSponsorData }) {
  const logoUrl = mediaUrl(sponsor.logo?.url);

  const logo = logoUrl ? (
    // eslint-disable-next-line @next/next/no-img-element -- Strapi upload with unknown aspect ratio
    <img
      src={logoUrl}
      alt={sponsor.logo?.alternativeText || sponsor.nazwa}
      width={sponsor.logo?.width ?? undefined}
      height={sponsor.logo?.height ?? undefined}
      loading="lazy"
      className="h-20 w-auto max-w-[16rem] object-contain sm:h-24"
    />
  ) : (
    <span className="text-xl font-semibold text-slate-800">{sponsor.nazwa}</span>
  );

  return (
    <section aria-label={sponsor.etykieta || 'Sponsor raportu'} className={`${CONTAINER} pt-8`}>
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500 sm:text-sm">
          {sponsor.etykieta || 'Sponsor raportu'}
        </p>
        {sponsor.url ? (
          <a href={sponsor.url} target="_blank" rel="noopener noreferrer sponsored" className="transition hover:opacity-80">
            {logo}
          </a>
        ) : (
          logo
        )}
        {sponsor.opis && <p className="max-w-[60ch] text-sm text-slate-600">{sponsor.opis}</p>}
      </div>
    </section>
  );
}
