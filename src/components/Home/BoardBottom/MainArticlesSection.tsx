'use client';

import { useEffect, useState } from 'react';
import { NewsItem } from '@/types/news';
import { fetchLatestNews } from '@/api/news';
import ArticleCard from '@/components/ui/Card';
import { ArticleCardSkeleton } from '@/components/ui/Skeleton';

export const MainArticlesSection: React.FC = () => {
  const [mainArticles, setMainArticles] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const news = await fetchLatestNews(7, 3);
        setMainArticles(news);
      } catch (error) {
        console.error('[MainArticlesSection] Failed to load:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 stagger-children">
      {mainArticles.map((news) => (
        <ArticleCard
          key={news.id}
          news={news}
          variant="compact"
          showDescription={false}
        />
      ))}
    </div>
  );
};