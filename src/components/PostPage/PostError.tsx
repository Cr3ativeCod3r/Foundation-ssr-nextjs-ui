import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface PostErrorProps {
  message: string;
}

export default function PostError({ message }: PostErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-4">
        <AlertTriangle className="text-rose-500" size={28} />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">
        Ups! Coś poszło nie tak
      </h2>
      <p className="text-slate-500 text-sm mb-6 text-center max-w-md">
        {message}
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
      >
        ← Wróć na stronę główną
      </Link>
    </div>
  );
}