'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Copies a value (e.g. the bank account number) to the clipboard */
export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked — the value stays visible and selectable on the page
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Skopiuj: ${label}`}
      aria-live="polite"
      className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-teal-700 ring-1 ring-teal-200 transition hover:bg-teal-700 hover:text-white"
    >
      {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
      {copied ? 'Skopiowano' : 'Kopiuj'}
    </button>
  );
}
