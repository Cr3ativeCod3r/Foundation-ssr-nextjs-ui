import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const ComingSoon: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center px-4 max-w-md animate-fade-in">
        <Image
          src="/img/coming-soon.webp"
          alt=""
          width={640}
          height={640}
          priority
          className="w-56 h-56 md:w-64 md:h-64 mx-auto mb-4"
        />
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
