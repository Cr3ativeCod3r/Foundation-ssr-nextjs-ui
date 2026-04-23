'use client';

import { useEffect, useState } from 'react';
import { NewsItem } from '@/types/news';
import { fetchLatestNews } from '@/api/news';
import ArticleCard from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { HorizontalCardSkeleton } from '@/components/ui/Skeleton';
import { Clock } from 'lucide-react';

export const LatestNewsSection: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await fetchLatestNews(0, 5);
        setLatestNews(news);
      } catch (error) {
        console.error('[LatestNewsSection] Failed to load:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, []);

  return (
    <div className="mb-6">
      <SectionHeader title="Najnowsze" icon={<Clock size={18} />} />

      {isLoading ? (
        <div className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <HorizontalCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="stagger-children">
          {latestNews.map((news) => (
            <ArticleCard
              key={news.id}
              news={news}
              variant="horizontal"
              showDescription={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};