import { Clock, Sparkles } from 'lucide-react';

const ComingSoon: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center px-4 max-w-md animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Clock className="text-teal-500" size={36} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          Zakładka dostępna wkrótce
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          Pracujemy nad tą stroną. Dziękujemy za cierpliwość! 🙂
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-teal-600 font-medium">
          <Sparkles size={14} />
          <span>Pracujemy nad nowymi funkcjami</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;