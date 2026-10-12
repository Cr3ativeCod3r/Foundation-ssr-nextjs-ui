import type { ComponentType } from 'react';
import type { ReportContext, ReportPageData } from '@/types/reportSections';
import DownloadCta from './DownloadCta';
import FindingsSummary from './FindingsSummary';
import Methodology from './Methodology';
import PartnerCta from './PartnerCta';
import ReportHero from './ReportHero';
import TableauDashboard from './TableauDashboard';

/** Strapi Dynamic Zone component → React component */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- each block gets its own Strapi props
const BLOCKS: Record<string, ComponentType<any>> = {
  'report.hero': ReportHero,
  'report.findings-summary': FindingsSummary,
  'report.methodology': Methodology,
  'report.tableau-embed': TableauDashboard,
  'report.download-cta': DownloadCta,
  'report.partner-cta': PartnerCta,
};

interface ReportSectionsProps {
  sekcje: NonNullable<ReportPageData['sekcje']>;
  report: ReportContext;
}

/** Renders the report's sections in the order set by the editors */
export default function ReportSections({ sekcje, report }: ReportSectionsProps) {
  return sekcje.map((block) => {
    const Block = BLOCKS[block.__component];
    // Unknown block (e.g. added in Strapi before the frontend) is skipped, the page keeps working
    return Block ? <Block key={`${block.__component}-${block.id}`} {...block} report={report} /> : null;
  });
}
