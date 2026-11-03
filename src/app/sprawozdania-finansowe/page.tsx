import type { Metadata } from 'next';
import { Calculator, Download, FileText, Landmark, PieChart, Scale, Wallet } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Sprawozdania finansowe',
  description:
    'Sprawozdania finansowe Fundacji Chorób Mózgu – roczne sprawozdania, bilans i rachunek zysków i strat do pobrania w formacie PDF.',
  alternates: { canonical: 'https://chorobymozgu.pl/sprawozdania-finansowe' },
};

const BASE = '/documents/sprawozdania';

interface Doc {
  title: string;
  file: string;
  sizeMb: number;
}

const ANNUAL: (Doc & { year: string })[] = [
  { year: '2025', title: 'Sprawozdanie finansowe za 2025 rok', file: 'sprawozdanie-finansowe-2025.pdf', sizeMb: 3.3 },
  { year: '2024', title: 'Sprawozdanie finansowe za 2024 rok', file: 'sprawozdanie-finansowe-2024.pdf', sizeMb: 3.3 },
  { year: '2023', title: 'Sprawozdanie finansowe za 2023 rok', file: 'sprawozdanie-finansowe-2023.pdf', sizeMb: 3.5 },
  { year: '2022', title: 'Sprawozdanie finansowe za 2022 rok', file: 'sprawozdanie-finansowe-2022.pdf', sizeMb: 3.5 },
  { year: '2021', title: 'Sprawozdanie finansowe za 2021 rok', file: 'sprawozdanie-finansowe-2021.pdf', sizeMb: 3.5 },
];

const OTHER: Doc[] = [
  { title: 'Sprawozdanie dla jednostki mikro', file: 'sprawozdanie-mikro.pdf', sizeMb: 3.2 },
  { title: 'Sprawozdanie dla jednostki mikro – informacje ogólne', file: 'sprawozdanie-mikro-informacje-ogolne.pdf', sizeMb: 3.0 },
  { title: 'Bilans', file: 'bilans.pdf', sizeMb: 1.0 },
  { title: 'Rachunek zysków i strat', file: 'rachunek-zyskow-i-strat.pdf', sizeMb: 1.2 },
];

function DocRow({ doc, badge }: { doc: Doc; badge?: string }) {
  return (
    <a
      href={`${BASE}/${doc.file}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md md:p-5"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-transform duration-300 group-hover:scale-110">
        {badge ? <span className="text-sm font-bold">{badge}</span> : <FileText size={22} />}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-teal-700 md:text-base">
          {doc.title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-400">PDF · {doc.sizeMb.toFixed(1).replace('.', ',')} MB</p>
      </div>
      <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
        <Download size={14} />
        <span className="hidden sm:inline">Pobierz</span>
      </span>
    </a>
  );
}

export default function FinancialStatementsPage() {
  return (
    <div className="min-h-screen animate-fade-in">
      <PageHero
        icon={Landmark}
        eyebrow="Fundacja"
        title="Sprawozdania finansowe"
        description="Działamy jawnie. Poniżej znajdziesz sprawozdania finansowe Fundacji Chorób Mózgu z kolejnych lat do pobrania w formacie PDF."
        decorations={[PieChart, Calculator, Scale, Wallet]}
      />

      <div className="container mx-auto max-w-3xl space-y-12 px-4 py-12">
        <section>
          <h2 className="mb-5 text-lg font-bold text-slate-800 md:text-xl">Sprawozdania roczne</h2>
          <div className="space-y-3">
            {ANNUAL.map((doc) => (
              <DocRow key={doc.file} doc={doc} badge={doc.year} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-lg font-bold text-slate-800 md:text-xl">Pozostałe dokumenty</h2>
          <div className="space-y-3">
            {OTHER.map((doc) => (
              <DocRow key={doc.file} doc={doc} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
