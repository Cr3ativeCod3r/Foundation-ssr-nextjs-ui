import type { Metadata } from 'next';
import Link from 'next/link';
import { Brain, HandHeart, Heart, HeartHandshake, Landmark, Users } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import CopyButton from './CopyButton';

export const metadata: Metadata = {
  title: 'Wesprzyj nas',
  description:
    'Wesprzyj Fundację Chorób Mózgu darowizną. Numer konta PKO BP, KRS i NIP fundacji.',
  alternates: { canonical: 'https://chorobymozgu.pl/wesprzyj' },
};

const BANK_NAME = 'PKO BP S.A.';
const ACCOUNT_NUMBER = '90 1020 3147 0000 8402 0087 8900';

const DETAILS = [
  { label: 'Odbiorca', value: 'Fundacja Chorób Mózgu' },
  { label: 'KRS', value: '0000415316' },
  { label: 'NIP', value: '712-327-14-15' },
  { label: 'Tytuł przelewu', value: 'Darowizna na cele statutowe' },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen animate-fade-in">
      <PageHero
        icon={HandHeart}
        eyebrow="Fundacja"
        title="Wesprzyj nas"
        description="Każda darowizna pomaga nam rzetelnie edukować o chorobach mózgu, wspierać pacjentów i ich bliskich oraz rozwijać projekty Fundacji."
        decorations={[Heart, Brain, Users, HeartHandshake]}
      />

      <div className="container mx-auto max-w-3xl px-4 py-12">
        <section className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-6 shadow-sm md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal-600 shadow-sm ring-1 ring-teal-100">
              <Landmark size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Przekaż darowiznę</h2>
              <p className="text-sm text-slate-500">Przelew tradycyjny na konto Fundacji</p>
            </div>
          </div>

          <div className="mb-6 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Numer konta · {BANK_NAME}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-lg font-semibold tracking-wide text-slate-900 select-all sm:text-xl">
                {ACCOUNT_NUMBER}
              </p>
              <CopyButton value={ACCOUNT_NUMBER.replace(/\s/g, '')} label="numer konta" />
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {DETAILS.map(({ label, value }) => (
              <div key={label} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</dt>
                <dd className="font-medium text-slate-800 select-all">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-8 text-center text-sm text-slate-500">
          Chcesz wesprzeć nas w inny sposób?{' '}
          <Link href="/kontakt" className="font-semibold text-teal-700 hover:text-teal-800 hover:underline">
            Napisz do nas
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
