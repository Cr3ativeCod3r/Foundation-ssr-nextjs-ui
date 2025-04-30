interface Partner {
    id: number;
    name: string;
    logoUrl: string;
}

const partners: Partner[] = Array(6).fill(null).map((_, index) => ({
    id: index + 1,
    name: `Partner ${index + 1}`,
    logoUrl: `/images/partner${index + 1}.png`
}));

export const PartnersSection: React.FC = () => {
    return (
        <div className="mt-12 py-6 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-lg font-bold mb-6">Partnerzy serwisu</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {partners.map(partner => (
                        <div key={partner.id} className="bg-gray-100 p-4 flex items-center justify-center h-16">
                            <span className="text-gray-500">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};