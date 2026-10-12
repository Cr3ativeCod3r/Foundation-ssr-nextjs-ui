import type { PartnerCtaBlock, ReportContext } from '@/types/reportSections';
import { isExternalUrl } from '@/utils/reportFormat';
import { CopyLinkButton, TrackedLink } from './client';
import { BUTTON_SECONDARY, CONTAINER, EYEBROW } from './styles';

interface PartnerCtaProps extends PartnerCtaBlock {
  report: ReportContext;
}

/** report.partner-cta — box for partners and donors */
export default function PartnerCta({ etykieta, naglowek, tekst, przyciskEtykieta, przyciskUrl, report }: PartnerCtaProps) {
  return (
    <section className={`${CONTAINER} pt-8`}>
      <div className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[1.3fr_auto]">
        <div>
          {etykieta && <p className={EYEBROW}>{etykieta}</p>}
          <h2 className="report-display text-3xl font-medium leading-tight lg:text-[2.4rem]">{naglowek}</h2>
          {tekst && <p className="mt-3 max-w-[70ch] text-sm text-slate-600 sm:text-base">{tekst}</p>}
        </div>
        <div className="flex flex-col items-start gap-2">
          {przyciskUrl && (
            <TrackedLink
              href={przyciskUrl}
              event="report_partner_click"
              slug={report.slug}
              external={isExternalUrl(przyciskUrl)}
              className={BUTTON_SECONDARY}
            >
              {przyciskEtykieta || 'Porozmawiajmy o współpracy'}
            </TrackedLink>
          )}
          <CopyLinkButton className="inline-flex min-h-12 items-center gap-2 text-sm font-bold underline underline-offset-4 hover:text-teal-700 sm:text-base" />
        </div>
      </div>
    </section>
  );
}
