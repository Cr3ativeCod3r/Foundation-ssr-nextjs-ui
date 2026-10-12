import type { CSSProperties } from 'react';
import type { ListItem, MethodologyBlock } from '@/types/reportSections';
import { CHAPTER_PADDING, CONTAINER, EYEBROW, H2, LEAD } from './styles';

/** report.methodology — data flow steps and "what the data shows / doesn't show" */
export default function Methodology({ etykieta, naglowek, wstep, kroki, pokazuja, niePokazuja }: MethodologyBlock) {
  const steps = kroki ?? [];

  return (
    <section id="dane" className={`${CONTAINER} ${CHAPTER_PADDING} scroll-mt-24`}>
      <div className="mb-10 max-w-[52rem]">
        {etykieta && <p className={EYEBROW}>{etykieta}</p>}
        <h2 className={H2}>{naglowek}</h2>
        {wstep && <p className={LEAD}>{wstep}</p>}
      </div>

      {steps.length > 0 && (
        <ol
          aria-label="Przepływ danych"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))]"
          style={{ '--steps': steps.length } as CSSProperties}
        >
          {steps.map((step) => (
            <li
              key={step.id}
              className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:[&:not(:last-child)]:after:absolute lg:[&:not(:last-child)]:after:-right-4 lg:[&:not(:last-child)]:after:top-1/2 lg:[&:not(:last-child)]:after:z-10 lg:[&:not(:last-child)]:after:-translate-y-1/2 lg:[&:not(:last-child)]:after:translate-x-1/2 lg:[&:not(:last-child)]:after:font-bold lg:[&:not(:last-child)]:after:text-teal-600 lg:[&:not(:last-child)]:after:content-['→']"
            >
              <span className="block text-xs uppercase tracking-[0.06em] text-slate-500">{step.etykieta}</span>
              <strong className="mt-2 block text-base leading-tight md:text-lg">{step.wartosc}</strong>
              {step.opis && <em className="mt-1 block text-xs not-italic text-slate-500 sm:text-sm">{step.opis}</em>}
            </li>
          ))}
        </ol>
      )}

      {(pokazuja?.length > 0 || niePokazuja?.length > 0) && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <MethodColumn title="Te dane pokazują" items={pokazuja} className="bg-teal-50 ring-1 ring-teal-100" />
          <MethodColumn title="Te dane nie pokazują" items={niePokazuja} className="bg-rose-50 ring-1 ring-rose-100" />
        </div>
      )}
    </section>
  );
}

function MethodColumn({ title, items, className }: { title: string; items: ListItem[]; className: string }) {
  if (!items?.length) return null;

  return (
    <article className={`rounded-xl p-6 ${className}`}>
      <h3 className="text-base font-bold md:text-lg">{title}</h3>
      <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm sm:text-base">
        {items.map((item) => (
          <li key={item.id}>{item.tekst}</li>
        ))}
      </ul>
    </article>
  );
}
