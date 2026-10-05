import { FaBrain, FaEnvelope } from 'react-icons/fa';

export default function MigraineBanner() {
    return (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 md:p-6 mb-6 shadow-sm">
            <div className="max-w-3xl mx-auto space-y-3">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaBrain className="text-red-500" />
                    Fundacja Chorób Mózgu
                </h2>

                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Zrzeszamy pacjentów zmagających się z migreną. 
                    Znajdziesz tu informacje o chorobie, porady, zalecenia (także dietetyczne),
                    ćwiczenia i wiele więcej.
                </p>

                <div className="flex flex-col md:flex-row md:items-center justify-between bg-white border border-red-100 rounded-lg p-3 md:p-4 shadow-sm">
                    <div>
                        <h3 className="text-sm md:text-base font-semibold text-gray-800">
                            Masz pytania? Chcesz wiedzieć więcej?
                        </h3>
                        <p className="text-gray-700 text-sm">Napisz do nas!</p>
                    </div>
                    <a
                        href="mailto:migrena@chorobymozgu.pl"
                        className="mt-3 md:mt-0 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow hover:shadow-md"
                    >
                        <FaEnvelope />
                        migrena@chorobymozgu.pl
                    </a>
                </div>
            </div>
        </div>
    );
}