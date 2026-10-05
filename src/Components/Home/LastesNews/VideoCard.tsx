import { Play, Youtube } from 'lucide-react';
import type { YoutubeVideo } from '@/types/youtube';

/**
 * YouTube video in the same horizontal layout as ArticleCard's "horizontal"
 * variant. Opens the video on YouTube in a new tab.
 */
export default function VideoCard({ video }: { video: YoutubeVideo }) {
  const formattedDate = new Date(video.publishedAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="flex gap-3 py-3.5 border-b border-gray-100 transition-all duration-300 hover:bg-slate-50/50 rounded-lg px-2 -mx-2">
        {/* Thumbnail */}
        <div className="w-[140px] flex-shrink-0 relative overflow-hidden rounded-lg bg-slate-900 aspect-video self-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            width={140}
            height={79}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play size={14} fill="currentColor" className="ml-0.5" />
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <span className="mb-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600">
            <Youtube size={12} />
            Wideo
          </span>
          <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors">
            {video.title}
          </h3>
          <span className="text-[11px] text-slate-400 mt-1">{formattedDate}</span>
        </div>
      </div>
    </a>
  );
}
