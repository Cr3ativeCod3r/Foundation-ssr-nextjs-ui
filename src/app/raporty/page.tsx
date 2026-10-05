import type { Metadata } from 'next';
import {
  AlertTriangle,
  BarChart3,
  Brain,
  Download,
  FileBarChart,
  Filter,
  Inbox,
  LineChart,
  Maximize2,
  MousePointerClick,
  PieChart,
} from 'lucide-react';
import { fetchReports, REPORTS_PAGE_SIZE } from '@/api/reports';
import ReportCard from '@/components/Reports/ReportCard';
import ReportsPagination from '@/components/Reports/ReportsPagination';
import PageHero from '@/components/ui/PageHero';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Raporty | ChorobyMózgu.pl',
  description: 'Raporty i wizualizacje danych Fundacji Chorób Mózgu.',
};

interface ReportsPageProps {
  searchParams?: Promise<{ page?: string }>;
}

const TIPS = [
  {
    icon: Filter,
    title: 'Filtruj dane',
    text: 'Klikaj elementy wykresów i korzystaj z filtrów, aby zawęzić wyniki.',
  },
  {
    icon: Maximize2,
    title: 'Pełny ekran',
    text: 'Otwórz raport w Tableau Public, aby zobaczyć go w pełnym rozmiarze.',
  },
  {
    icon: Download,
    title: 'Pobierz',
    text: 'Pasek narzędzi pod wizualizacją pozwala pobrać obraz, PDF lub dane.',
  },
];

/** Polish plural form of "raport" for the given count */
function reportsLabel(count: number): string {
  if (count === 1) return 'raport';
  const lastDigit = count % 10;
  const lastTwo = count % 100;
  return lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14) ? 'raporty' : 'raportów';
}

function StateMessage({ icon: Icon, title, text }: { icon: typeof Inbox; title: string; text: string }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon size={26} />
      </div>
      <h2 className="mb-1 text-lg font-semibold text-slate-800">{title}</h2>
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const pageParam = Number((await searchParams)?.page);
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  let content: React.ReactNode;
  let total: number | null = null;

  try {
    const { data: reports, meta } = await fetchReports(page, REPORTS_PAGE_SIZE);
    total = meta.pagination.total;

    // The newest report gets a wide card on the first page
    const featured = page === 1 ? reports[0] : undefined;
    const rest = featured ? reports.slice(1) : reports;

    content =
      reports.length === 0 ? (
        <StateMessage
          icon={Inbox}
          title="Brak raportów"
          text="Pracujemy nad pierwszymi raportami. Zajrzyj tu wkrótce."
        />
      ) : (
        <>
          {featured && (
            <div className="mb-8 animate-fade-in">
              <ReportCard report={featured} featured />
            </div>
          )}

          {rest.length > 0 && (
            <>
              {featured && (
                <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                  <FileBarChart size={16} className="text-teal-600" />
                  Wcześniejsze raporty
                </h2>
              )}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
                {rest.map((report) => <ReportCard key={report.id} report={report} />)}
              </div>
            </>
          )}

          <ReportsPagination
            currentPage={meta.pagination.page}
            pageCount={meta.pagination.pageCount}
          />
        </>
      );
  } catch (error) {
    console.error('[ReportsPage] Error:', error);
    content = (
      <StateMessage
        icon={AlertTriangle}
        title="Coś poszło nie tak"
        text="Nie udało się załadować raportów. Spróbuj ponownie później."
      />
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      <PageHero
        icon={BarChart3}
        eyebrow="Dane i analizy"
        title="Raporty"
        description="Interaktywne raporty i wizualizacje danych o chorobach mózgu, przygotowane przez Fundację. Przeglądaj, filtruj i odkrywaj liczby, które stoją za problemem."
        decorations={[BarChart3, PieChart, LineChart, Brain]}
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          {total !== null && (
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 ring-1 ring-white/15">
              <FileBarChart size={16} className="text-teal-200" />
              <strong className="font-semibold">{total}</strong>
              <span className="text-teal-50/80">
                {reportsLabel(total)}
              </span>
            </span>
          )}
          <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 ring-1 ring-white/15">
            <MousePointerClick size={16} className="text-teal-200" />
            <span className="text-teal-50/80">Interaktywne wykresy</span>
          </span>
        </div>
      </PageHero>

      <div className="container mx-auto max-w-6xl px-4 py-12">{content}</div>

      {/* How to use */}
      <section className="container mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6 md:p-10">
          <h2 className="mb-6 text-xl font-bold text-slate-800">Jak korzystać z raportów?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TIPS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600 shadow-sm ring-1 ring-teal-100">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-800">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
