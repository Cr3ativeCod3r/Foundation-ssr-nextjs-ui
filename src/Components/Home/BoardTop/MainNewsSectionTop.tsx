'use client';

import { useEffect, useState } from 'react';
import { NewsItem } from '@/types/news';
import { fetchLatestNews } from '@/api/news';
import ArticleCard from '@/components/ui/Card';
import { ArticleCardSkeleton } from '@/components/ui/Skeleton';

export const MainNewsSectionTop: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const latestNews = await fetchLatestNews(5, 2);
        setNews(latestNews);
      } catch (error) {
        console.error('[MainNewsSectionTop] Failed to load:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 stagger-children">
      {news.map((item, index) => (
        <ArticleCard
          key={item.id}
          news={item}
          variant="featured"
          priority={index === 0}
        />
      ))}
    </div>
  );
};