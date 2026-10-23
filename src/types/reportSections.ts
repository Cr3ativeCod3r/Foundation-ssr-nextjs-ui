/**
 * Report page types — Strapi "Raporty" with the "sekcje" Dynamic Zone (variant A)
 */

import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { Report } from './report';

/** Strapi media file (only the fields the page uses) */
export interface StrapiMedia {
  id: number;
  url: string;
  name: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
  /** Size in kB */
  size: number;
  ext: string;
  mime: string;
}

export interface MetaItem {
  id: number;
  etykieta: string;
  wartosc: string;
}

export interface ListItem {
  id: number;
  tekst: string;
}

export interface Seo {
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: StrapiMedia | null;
}

export interface GlossaryTerm {
  id: number;
  documentId: string;
  termin: string;
  definicja: string;
  kolejnosc: number | null;
}

/* ── Dynamic Zone components ── */

export interface PopulationItem {
  id: number;
  wartoscTekst: string;
  wartoscLiczba: number | string;
  opis: string | null;
  zrodloEtykieta: string | null;
  zrodloUrl: string | null;
  daneRaportu: boolean | null;
  szacunek: boolean | null;
}

export interface PopulationCard {
  id: number;
  nadtytul: string | null;
  tytul: string;
  pozycje: PopulationItem[];
  nota: string | null;
}

export interface HeroBlock {
  __component: 'report.hero';
  id: number;
  eyebrow: string | null;
  tytul: string;
  lead: string | null;
  meta: MetaItem[];
  kartaLiczb: PopulationCard | null;
}

export interface ChartPoint {
  etykieta: string;
  wartosc: number;
}

export interface ChartData {
  typ?: string;
  /** Short name of the measure, used in the chart's accessible label */
  opis?: string;
  jednostka?: string;
  pozycje?: ChartPoint[];
}

export interface Finding {
  id: number;
  liczba: string;
  tytul: string;
  opis: BlocksContent | null;
  typWykresu: 'brak' | 'porownanie' | 'podzial' | null;
  daneWykresu: ChartData | null;
}

export interface FindingsSummaryBlock {
  __component: 'report.findings-summary';
  id: number;
  etykieta: string | null;
  naglowek: string;
  wstep: string | null;
  wnioski: Finding[];
}

export interface MethodStep {
  id: number;
  etykieta: string;
  wartosc: string;
  opis: string | null;
}

export interface MethodologyBlock {
  __component: 'report.methodology';
  id: number;
  etykieta: string | null;
  naglowek: string;
  wstep: string | null;
  kroki: MethodStep[];
  pokazuja: ListItem[];
  niePokazuja: ListItem[];
}

export interface TableauEmbedBlock {
  __component: 'report.tableau-embed';
  id: number;
  etykieta: string | null;
  naglowek: string;
  opis: string | null;
  punkty: ListItem[];
  tableauWidok: string;
  wysokoscDesktop: number | null;
  wysokoscMobile: number | null;
  miniatura: StrapiMedia | null;
  nota: string | null;
}

export interface DownloadCtaBlock {
  __component: 'report.download-cta';
  id: number;
  etykieta: string | null;
  naglowek: string;
  opis: string | null;
  spisTresci: ListItem[];
  linkInteraktywny: string | null;
}

export interface PartnerCtaBlock {
  __component: 'report.partner-cta';
  id: number;
  etykieta: string | null;
  naglowek: string;
  tekst: string | null;
  przyciskEtykieta: string | null;
  przyciskUrl: string | null;
}

export type ReportSection =
  | HeroBlock
  | FindingsSummaryBlock
  | MethodologyBlock
  | TableauEmbedBlock
  | DownloadCtaBlock
  | PartnerCtaBlock;

/** Report with all variant A fields populated */
/** Sponsor shown at the bottom of the report */
export interface ReportSponsor {
  id: number;
  etykieta: string | null;
  nazwa: string;
  logo: StrapiMedia | null;
  url: string | null;
  opis: string | null;
}

export interface ReportPageData extends Report {
  updatedAt: string;
  sekcje: (ReportSection | { __component: string; id: number })[] | null;
  plikPdf: StrapiMedia | null;
  liczbaStron: number | null;
  seo: Seo | null;
  slowniczek: GlossaryTerm[] | null;
  sponsor: ReportSponsor | null;
}

/** Report-level data every section can use (PDF, slug, anchors) */
export interface ReportContext {
  slug: string;
  nazwa: string;
  pdf: { url: string; sizeLabel: string } | null;
  liczbaStron: number | null;
  hasGlossary: boolean;
  /** id of the dashboard section, when the report has one */
  dashboardAnchor: string | null;
}
