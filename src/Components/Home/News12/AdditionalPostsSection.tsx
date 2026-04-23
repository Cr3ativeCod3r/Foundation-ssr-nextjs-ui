'use client';

import { useEffect, useState } from 'react';
import AdBanner from '../AdBanner';
import ArticleCard from '@/components/ui/Card';
import { ArticleCardSkeleton } from '@/components/ui/Skeleton';
import SectionHeader from '@/components/ui/SectionHeader';
import { Newspaper } from 'lucide-react';
import type { NewsItem } from '@/types/news';
import { fetchLatestNews } from '@/api/news';

export const AdditionalPostsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const fetchedNews = await fetchLatestNews(10, 12);
        setNews(fetchedNews);
      } catch (error) {
        console.error('[AdditionalPostsSection] Failed to load:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-10">
        <SectionHeader title="Więcej artykułów" icon={<Newspaper size={18} />} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (news.length === 0) return null;

  const renderNewsItems = () => {
    const items: React.ReactNode[] = [];

    news.forEach((newsItem, index) => {
      items.push(
        <ArticleCard
          key={newsItem.id}
          news={newsItem}
          variant="default"
          showReadMore
        />,
      );

      // Banner after every 6th item
      if ((index + 1) % 6 === 0 && index !== 0) {
        items.push(
          <div key={`banner-${index}`} className="col-span-1 sm:col-span-2 lg:col-span-3 my-4">
            <div className="border-t border-dashed border-slate-200 pt-4 pb-4">
              <AdBanner bannerId={1} interval={5000} />
            </div>
          </div>,
        );
      }
    });

    return items;
  };

  return (
    <div className="mt-10">
      <SectionHeader title="Więcej artykułów" icon={<Newspaper size={18} />} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {renderNewsItems()}
      </div>
    </div>
  );
};