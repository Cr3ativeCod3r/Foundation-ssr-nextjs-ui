import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  /** Icon shown in the small pill above the title */
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: ReactNode;
  /** Up to four faint icons scattered in the background (desktop only) */
  decorations?: LucideIcon[];
  /** Extra content under the description, e.g. stat chips */
  children?: ReactNode;
}

const DECORATION_SLOTS = [
  { className: 'left-[8%] top-[22%] -rotate-6', size: 64 },
  { className: 'left-[16%] bottom-[14%] rotate-12', size: 48 },
  { className: 'right-[10%] top-[18%] rotate-6', size: 60 },
  { className: 'right-[18%] bottom-[12%] -rotate-12', size: 52 },
];

/** Dark teal page banner with grid pattern, glow and decorative icons */
export default function PageHero({
  icon: Icon,
  eyebrow,
  title,
  description,
  decorations = [],
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      {decorations.length > 0 && (
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
          {decorations.slice(0, DECORATION_SLOTS.length).map((Decoration, i) => (
            <Decoration
              key={i}
              className={`absolute text-white/10 ${DECORATION_SLOTS[i].className}`}
              size={DECORATION_SLOTS[i].size}
              strokeWidth={1.25}
            />
          ))}
        </div>
      )}

      <div className="container relative mx-auto px-4 py-12 text-center md:py-20">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-50 backdrop-blur">
          <Icon size={14} />
          {eyebrow}
        </span>
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mx-auto max-w-2xl text-sm text-teal-50/80 md:text-lg">{description}</p>
        {children}
      </div>
    </section>
  );
}
