import { Brain, Users, Target } from 'lucide-react';

export default function WhyHowWhat() {
  return (
    <div className="flex flex-col bg-gray-50 mb-8">
      <div className="lg:w-[85vw] w-[95vw] mx-auto mt-8">
        {/* WHY Section */}
        <div className="mb-4">
          <div className="flex items-start gap-3">
            <Brain className="text-pink-400 flex-shrink-0" size={20} />
            <div>
              <span className="font-semibold text-gray-700">Dlaczego to robimy</span>
              <span className="text-gray-600 ml-2">— Choroby mózgu dotykają miliony ludzi, a dostęp do rzetelnej wiedzy i wsparcia jest kluczowy dla pacjentów i ich bliskich.</span>
            </div>
          </div>
        </div>

        {/* HOW Section */}
        <div className="mb-4">
          <div className="flex items-start gap-3">
            <Users className="text-blue-400 flex-shrink-0" size={20} />
            <div>
              <span className="font-semibold text-gray-700">Jak pomagamy</span>
              <span className="text-gray-600 ml-2">— Publikujemy artykuły edukacyjne, oferujemy bezpośrednie wsparcie oraz organizujemy wydarzenia dla chorych i ich rodzin.</span>
            </div>
          </div>
        </div>

        {/* WHAT Section */}
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <Target className="text-green-400 flex-shrink-0" size={20} />
            <div>
              <span className="font-semibold text-gray-700">Co oferujemy</span>
              <span className="text-gray-600 ml-2">— Dostęp do wiedzy medycznej, indywidualne wsparcie, grupy wsparcia oraz spotkania i warsztaty.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}