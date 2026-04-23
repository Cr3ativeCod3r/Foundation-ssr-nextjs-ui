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

export default function MissionBanner() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MISSION_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3 group animate-fade-in"
              >
                <div
                  className={`
                    flex-shrink-0 w-10 h-10 rounded-xl ${item.bgColor}
                    flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-300
                  `}
                >
                  <Icon className={item.color} size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}