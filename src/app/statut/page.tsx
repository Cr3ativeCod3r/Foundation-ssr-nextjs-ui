import React from 'react';
import { Download, FileText } from 'lucide-react';

const Statute: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="card-elevated p-8 md:p-12 max-w-lg text-center">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-6">
          <FileText className="text-teal-600" size={28} />
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-3">
          Statut organizacji
        </h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Aby pobrać pełny dokument statutu Fundacji Chorób Mózgu, kliknij przycisk poniżej.
        </p>

        <a
          href="/documents/statut.pdf"
          download
          className="
            inline-flex items-center gap-2
            px-6 py-3 rounded-xl
            bg-gradient-to-r from-teal-600 to-teal-500
            text-white font-semibold text-sm
            hover:from-teal-700 hover:to-teal-600
            transition-all duration-200
            shadow-md hover:shadow-lg
            hover:-translate-y-0.5
          "
        >
          <Download size={18} />
          Pobierz Statut (PDF)
        </a>
      </div>
    </div>
  );
};

export default Statute;