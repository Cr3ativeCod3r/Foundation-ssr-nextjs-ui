interface Partner {
  id: number;
  name: string;
}

const PARTNERS: Partner[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: `Partner ${index + 1}`,
}));

export const PartnersSection: React.FC = () => {
  return (
    <div className="border-t border-slate-100 bg-white hidden lg:block">
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">
          Partnerzy serwisu
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="
                bg-slate-50 border border-slate-100 rounded-xl
                p-6 flex items-center justify-center
                hover:border-teal-200 hover:bg-teal-50/30
                transition-all duration-300
                group cursor-pointer
              "
            >
              <span className="text-sm text-slate-400 group-hover:text-teal-600 transition-colors font-medium">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};