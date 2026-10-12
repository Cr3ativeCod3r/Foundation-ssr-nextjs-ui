import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { AlertTriangle, ArrowLeft, BarChart3, Calendar } from 'lucide-react';
import { fetchReportPage } from '@/api/reportPage';
import ScrollLock from '@/components/Reports/ScrollLock';
import TableauEmbed from '@/components/Reports/TableauEmbed';
import ReportArticle from '@/components/Reports/sections/ReportArticle';
import type { Report } from '@/types/report';
import type { HeroBlock, ReportPageData } from '@/types/reportSections';
import { mediaUrl } from '@/utils/reportFormat';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://chorobymozgu.pl';
const FALLBACK_DESCRIPTION =
  'Raport Fundacji Chorób Mózgu z serii Dane dla mózgu: dane publiczne o chorobach mózgu w Polsce, wnioski i interaktywny dashboard.';

interface ReportPageProps {
  params: Promise<{ slug: string }>;
}

function findHero(report: ReportPageData): HeroBlock | undefined {
  return report.sekcje?.find((b): b is HeroBlock => b.__component === 'report.hero');
}

/** og:image: SEO image → dashboard thumbnail → site default (from the root layout) */
function shareImage(report: ReportPageData): string | null {
  if (report.seo?.ogImage) return mediaUrl(report.seo.ogImage.url);
  const dashboard = report.sekcje?.find((b) => b.__component === 'report.tableau-embed') as
    | { miniatura?: { url: string } | null }
    | undefined;
  return mediaUrl(dashboard?.miniatura?.url);
}

export async function generateMetadata({ params }: ReportPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const report = await fetchReportPage(slug);
    if (report) {
      const hero = findHero(report);
      const title = report.seo?.metaTitle || report.nazwa;
      const description = report.seo?.metaDescription || hero?.lead || FALLBACK_DESCRIPTION;
      const image = shareImage(report);
      const url = `${SITE_URL}/raporty/${report.slug}`;

      return {
        // Layout template appends "| Choroby Mózgu"
        title: `${title} | Raporty`,
        description,
        alternates: { canonical: url },
        openGraph: {
          title,
          description,
          url,
          type: 'article',
          locale: 'pl_PL',
          siteName: 'Choroby Mózgu',
          publishedTime: report.data,
          ...(image && { images: [{ url: image, alt: title }] }),
        },
        twitter: {
          card: image ? 'summary_large_image' : 'summary',
          title,
          description,
          ...(image && { images: [image] }),
        },
      };
    }
  } catch {
    // Fall through to the generic title
  }
  return { title: 'Raporty' };
}

function buildJsonLd(report: ReportPageData) {
  const hero = findHero(report);
  const image = shareImage(report);
  return {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: hero?.tytul || report.nazwa,
    headline: report.seo?.metaTitle || report.nazwa,
    description: report.seo?.metaDescription || hero?.lead || FALLBACK_DESCRIPTION,
    datePublished: report.data,
    dateModified: report.updatedAt,
    inLanguage: 'pl-PL',
    url: `${SITE_URL}/raporty/${report.slug}`,
    ...(image && { image }),
    ...(report.plikPdf && {
      encoding: {
        '@type': 'MediaObject',
        contentUrl: mediaUrl(report.plikPdf.url),
        encodingFormat: 'application/pdf',
      },
    }),
    publisher: {
      '@type': 'NGO',
      name: 'Fundacja Chorób Mózgu',
      url: SITE_URL,
    },
  };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { slug } = await params;

  let report: ReportPageData | null;
  try {
    report = await fetchReportPage(slug);
  } catch (error) {
    console.error('[ReportPage] Error:', error);
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
            <AlertTriangle size={26} />
          </div>
          <h1 className="mb-1 text-xl font-bold text-slate-800">Błąd</h1>
          <p className="mb-6 text-sm text-slate-500">Nie udało się załadować raportu. Spróbuj ponownie później.</p>
          <Link
            href="/raporty"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            <ArrowLeft size={16} />
            Wszystkie raporty
          </Link>
        </div>
      </div>
    );
  }

  if (!report) notFound();

  // Reports without sections keep the previous full-window Tableau view
  if (!report.sekcje?.length) return <LegacyReport report={report} />;

  return <ReportArticle report={report} jsonLd={buildJsonLd(report)} />;
}

/** Previous report view: only the Tableau embed pasted in the "kod" field */
function LegacyReport({ report }: { report: Report }) {
  return (
    <article className="fixed inset-x-0 bottom-0 top-[100px] z-40 flex bg-[var(--color-surface)] animate-fade-in">
      <ScrollLock />

      {/* Report window — fills the viewport below the navbar (and above the mobile bottom menu) */}
      <div className="mx-auto flex w-full max-w-7xl flex-col px-2 pb-24 pt-2 sm:px-4 sm:pt-4 lg:pb-4">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 sm:rounded-3xl">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-3 py-2.5 sm:px-5">
            <Link
              href="/raporty"
              aria-label="Wszystkie raporty"
              title="Wszystkie raporty"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:text-teal-700 hover:ring-teal-300"
            >
              <ArrowLeft size={16} />
            </Link>

            <h1 className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800 sm:text-base">
              {report.nazwa}
            </h1>

            <div className="flex shrink-0 items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 ring-1 ring-teal-100">
                <BarChart3 size={13} />
                Raport
              </span>
              <span className="hidden items-center gap-1.5 text-xs text-slate-500 sm:inline-flex">
                <Calendar size={14} className="text-teal-600" />
                <time dateTime={report.data}>
                  {format(parseISO(report.data), 'd MMMM yyyy', { locale: pl })}
                </time>
              </span>
            </div>
          </div>

          <TableauEmbed code={report.kod} title={report.nazwa} />
        </div>
      </div>
    </article>
  );
}
