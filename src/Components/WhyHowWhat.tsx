import { Brain, Users, Target } from 'lucide-react';

const MISSION_ITEMS = [
  {
    icon: Brain,
    color: 'text-rose-400',
    bgColor: 'bg-rose-50',
    title: 'Dlaczego to robimy',
    description:
      'Choroby mózgu dotykają miliony ludzi, a dostęp do rzetelnej wiedzy i wsparcia jest kluczowy dla pacjentów i ich bliskich.',
  },
  {
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    title: 'Jak pomagamy',
    description:
      'Publikujemy artykuły edukacyjne, oferujemy bezpośrednie wsparcie oraz organizujemy wydarzenia dla chorych i ich rodzin.',
  },
  {
    icon: Target,
    color: 'text-teal-400',
    bgColor: 'bg-teal-50',
    title: 'Co oferujemy',
    description:
      'Dostęp do wiedzy medycznej, indywidualne wsparcie, grupy wsparcia oraz spotkania i warsztaty.',
  },
] as const;

function MissionItem({ item, duplicate = false }: { item: (typeof MISSION_ITEMS)[number]; duplicate?: boolean }) {
  const Icon = item.icon;
  return (
    <div
      aria-hidden={duplicate || undefined}
      className={`
        mr-3 flex w-[75vw] max-w-[300px] shrink-0 items-start gap-3 group
        rounded-xl border border-slate-100 bg-white p-3 shadow-sm
        md:mr-0 md:w-auto md:max-w-none md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none
        ${duplicate ? 'md:hidden' : ''}
      `}
    >
      <div
        className={`
          flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl ${item.bgColor}
          flex items-center justify-center
          group-hover:scale-110 transition-transform duration-300
        `}
      >
        <Icon className={`${item.color} h-4 w-4 md:h-5 md:w-5`} />
      </div>
      <div>
        <h3 className="font-bold text-sm text-slate-800 mb-0.5">
          {item.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-500 leading-snug md:leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function MissionBanner() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
      <div className="container mx-auto px-4 py-2 md:py-8 animate-fade-in">
        {/*
          Mobile: endless marquee drifting left — the items are rendered twice
          and the track moves by half its width, so the loop is seamless.
          md+: static three-column grid (duplicates hidden).
        */}
        <div className="-mx-4 overflow-hidden py-2 md:mx-0 md:overflow-visible md:py-0">
          <div className="flex w-max animate-marquee-left md:grid md:w-auto md:grid-cols-3 md:gap-6">
            {MISSION_ITEMS.map((item) => (
              <MissionItem key={item.title} item={item} />
            ))}
            {MISSION_ITEMS.map((item) => (
              <MissionItem key={`${item.title}-copy`} item={item} duplicate />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
