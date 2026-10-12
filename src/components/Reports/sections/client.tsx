'use client';

/**
 * Small interactive pieces of the report page: tracked links, copy-link button,
 * glossary dialog and rich text (the blocks renderer needs the client).
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { Check, Link2, X } from 'lucide-react';
import { trackEvent, type ReportEvent } from '@/utils/analytics';
import type { GlossaryTerm } from '@/types/reportSections';

/* ── Tracked link ── */

interface TrackedLinkProps {
  href: string;
  event: ReportEvent;
  slug: string;
  className?: string;
  download?: boolean;
  external?: boolean;
  children: ReactNode;
}

/** Plain <a> that sends an analytics event on click */
export function TrackedLink({ href, event, slug, className, download, external, children }: TrackedLinkProps) {
  return (
    <a
      href={href}
      className={className}
      download={download || undefined}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      onClick={() => trackEvent(event, { slug })}
    >
      {children}
    </a>
  );
}

/* ── Copy link ── */

export function CopyLinkButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = window.location.href.split('#')[0];
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt('Skopiuj link do raportu:', url);
    }
  }

  return (
    <button type="button" onClick={copy} className={className} aria-live="polite">
      {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
      {copied ? 'Skopiowano link' : 'Skopiuj link do raportu'}
    </button>
  );
}

/* ── Glossary ── */

const GLOSSARY_EVENT = 'report:open-glossary';

/** Button that opens the glossary dialog rendered elsewhere on the page */
export function GlossaryButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(GLOSSARY_EVENT))}
    >
      {children}
    </button>
  );
}

/** "Jak czytać te dane?" dialog with the report's glossary terms */
export function GlossaryDialog({ terms }: { terms: GlossaryTerm[] }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => ref.current?.showModal();
    window.addEventListener(GLOSSARY_EVENT, open);
    return () => window.removeEventListener(GLOSSARY_EVENT, open);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="glossary-title"
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto w-[min(40rem,calc(100vw-2rem))] rounded-3xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-10">
        <form method="dialog">
          <button
            aria-label="Zamknij"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-slate-200 transition hover:bg-slate-900 hover:text-white"
          >
            <X size={20} aria-hidden />
          </button>
        </form>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-teal-700">Słowniczek</p>
        <h2 id="glossary-title" className="report-display pr-12 text-3xl font-medium">
          Jak czytać te dane?
        </h2>
        <dl className="mt-6 grid gap-4">
          {terms.map((term) => (
            <div key={term.id}>
              <dt className="font-bold">{term.termin}</dt>
              <dd className="mt-1 text-sm text-slate-600">{term.definicja}</dd>
            </div>
          ))}
        </dl>
      </div>
    </dialog>
  );
}

/* ── Rich text ── */

export function RichText({ content }: { content: BlocksContent }) {
  return <BlocksRenderer content={content} />;
}
