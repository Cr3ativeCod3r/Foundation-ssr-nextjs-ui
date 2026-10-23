import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center px-4 max-w-md animate-fade-in">
        <Image
          src="/img/not-found.webp"
          alt=""
          width={640}
          height={640}
          priority
          className="w-56 h-56 md:w-64 md:h-64 mx-auto mb-4"
        />
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">
          Błąd 404
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          Nie znaleźliśmy tej strony
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          Strona mogła zostać przeniesiona lub usunięta. Sprawdź adres albo wróć na stronę główną.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 transition-colors"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}
