import Image from 'next/image';
import type { Category } from '@/types/news';
import PostMeta from './PostMeta';
import YoutubeEmbed from './YoutubeEmbed';

interface PostHeaderProps {
  title: string;
  imageUrl: string;
  category: Category;
  author: { name: string };
  date: string;
  shareUrl: string;
  yt_link: string;
}

export default function PostHeader({
  title,
  imageUrl,
  category,
  author,
  date,
  shareUrl,
  yt_link,
}: PostHeaderProps) {
  const fullImageUrl = imageUrl
    ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}${imageUrl}`
    : null;

  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6 px-1">
        <span className="font-bold text-teal-700">ChorobyMózgu.pl</span>
        <span className="text-slate-300">/</span>
        <span className="uppercase font-semibold text-slate-500 text-xs tracking-wide">
          {category.name}
        </span>
      </div>

      {/* Meta */}
      <PostMeta author={author} date={date} title={title} shareUrl={shareUrl} />

      {/* Hero media */}
      {yt_link ? (
        <div className="relative w-full h-full mb-8 overflow-hidden rounded-2xl shadow-lg">
          <YoutubeEmbed ytLink={yt_link} />
        </div>
      ) : (
        fullImageUrl && (
          <div className="relative w-full lg:h-[420px] h-[240px] mb-8 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={fullImageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 65vw"
            />
            {/* Subtle gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        )
      )}

      <hr className="border-slate-100" />
    </div>
  );
}