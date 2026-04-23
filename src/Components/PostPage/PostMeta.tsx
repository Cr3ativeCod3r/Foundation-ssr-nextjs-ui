import Image from 'next/image';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Facebook, Share2 } from 'lucide-react';

interface PostMetaProps {
  author: { name: string };
  date: string;
  title: string;
  shareUrl: string;
}

export default function PostMeta({ author, date, title, shareUrl }: PostMetaProps) {
  const formattedDate = format(new Date(date), 'd MMMM yyyy', { locale: pl });

  return (
    <div className="mx-2">
      <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-4">
        {title}
      </h1>

      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        {/* Author info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-teal-100 ring-offset-2">
            <Image
              src="/img/avatar.jpg"
              alt={author.name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="font-semibold text-sm text-slate-800">{author.name}</p>
            <p className="text-xs text-slate-400">{formattedDate}</p>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Udostępnij na Facebook"
            className="
              p-2 rounded-lg text-blue-500
              hover:bg-blue-50 hover:text-blue-600
              transition-all duration-200
            "
          >
            <Facebook size={20} />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Udostępnij na LinkedIn"
            className="
              p-2 rounded-lg text-slate-400
              hover:bg-slate-100 hover:text-slate-600
              transition-all duration-200
            "
          >
            <Share2 size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}