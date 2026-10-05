'use client';

import { useEffect, useMemo, useState } from 'react';
import { NewsItem } from '@/types/news';
import type { YoutubeVideo } from '@/types/youtube';
import { fetchLatestNews } from '@/api/news';
import ArticleCard from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { HorizontalCardSkeleton } from '@/components/ui/Skeleton';
import VideoCard from '@/Components/Home/LastesNews/VideoCard';
import { Clock } from 'lucide-react';

/** Rows in the column — same as before videos were added, so the layout stays intact */
const ITEMS_LIMIT = 5;

type FeedItem =
  | { kind: 'post'; date: number; news: NewsItem }
  | { kind: 'video'; date: number; video: YoutubeVideo };

interface LatestNewsSectionProps {
  /** Newest YouTube videos, fetched on the server */
  videos?: YoutubeVideo[];
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({ videos = [] }) => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await fetchLatestNews(0, ITEMS_LIMIT);
        setLatestNews(news);
      } catch (error) {
        console.error('[LatestNewsSection] Failed to load:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, []);

  // Posts and videos in one list, newest first, trimmed to ITEMS_LIMIT
  const items = useMemo<FeedItem[]>(
    () => [
      ...latestNews.map((news) => ({ kind: 'post' as const, date: Date.parse(news.createdAt), news })),
      ...videos.map((video) => ({ kind: 'video' as const, date: Date.parse(video.publishedAt), video })),
    ].sort((a, b) => b.date - a.date).slice(0, ITEMS_LIMIT),
    [latestNews, videos],
  );

  return (
    <div className="mb-6">
      <SectionHeader title="Najnowsze materiały" icon={<Clock size={18} />} />

      {isLoading ? (
        <div className="space-y-1">
          {Array.from({ length: ITEMS_LIMIT }).map((_, i) => (
            <HorizontalCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="stagger-children">
          {items.map((item) =>
            item.kind === 'post' ? (
              <ArticleCard
                key={`post-${item.news.id}`}
                news={item.news}
                variant="horizontal"
                showDescription={false}
              />
            ) : (
              <VideoCard key={`video-${item.video.id}`} video={item.video} />
            ),
          )}
        </div>
      )}
    </div>
  );
};
