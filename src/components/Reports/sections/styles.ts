/**
 * Shared Tailwind classes for the report page (variant A layout, site palette:
 * teal primary, rose accent, slate text).
 */

/** Centered content column (mockup: 76rem) */
export const CONTAINER = 'mx-auto w-full max-w-[76rem] px-4 sm:px-5';

/** Vertical rhythm of a chapter */
export const CHAPTER_PADDING = 'py-16 md:py-24';

/** Small uppercase label above headings ("01 / Najważniejsze wnioski") */
export const EYEBROW = 'mb-4 text-xs font-bold uppercase tracking-[0.08em] text-teal-700 sm:text-sm';

/** Chapter heading (serif display) */
export const H2 = 'report-display text-[2.2rem] font-medium leading-[1.04] tracking-[-0.025em] text-balance md:text-5xl lg:text-[3.6rem]';

/** Lead paragraph under a heading */
export const LEAD = 'mt-5 max-w-[60ch] text-lg leading-relaxed text-slate-600 text-pretty md:text-xl';

const BUTTON_BASE =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold no-underline transition sm:text-base focus-visible:outline-3 focus-visible:outline-offset-3';

/** Filled teal button — white on teal-700 passes WCAG AA (5.5:1) */
export const BUTTON_PRIMARY = `${BUTTON_BASE} bg-teal-700 text-white hover:-translate-y-px hover:bg-teal-800 focus-visible:outline-teal-600`;

/** Outlined button on light backgrounds */
export const BUTTON_SECONDARY = `${BUTTON_BASE} bg-transparent text-slate-900 ring-[1.5px] ring-inset ring-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-teal-600`;

/** Outlined button on the dark teal card */
export const BUTTON_GHOST = `${BUTTON_BASE} bg-transparent text-white ring-[1.5px] ring-inset ring-white/60 hover:bg-white hover:text-slate-900 focus-visible:outline-white`;

/** Light button on the dark teal card (keeps contrast against the teal background) */
export const BUTTON_ON_DARK = `${BUTTON_BASE} bg-white text-teal-800 hover:-translate-y-px hover:bg-teal-50 focus-visible:outline-white`;
