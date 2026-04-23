'use client';

import { useEffect, useState } from 'react';
import { fetchRandomNews } from '@/api/news';
import ArticleCard from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { ArticleCardSkeleton } from '@/components/ui/Skeleton';
import { Sparkles } from 'lucide-react';
import type { NewsItem } from '@/types/news';

interface RelatedPostsProps {
  currentPostId: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPostId }) => {
  const [relatedPosts, setRelatedPosts] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await fetchRandomNews(currentPostId, 0, 6);
        setRelatedPosts(posts);
      } catch (error) {
        console.error('[RelatedPosts] Failed to load:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRelatedPosts();
  }, [currentPostId]);

  if (!isLoading && relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="py-10 border-t border-slate-100 mt-8">
      <SectionHeader title="Sprawdź także" icon={<Sparkles size={18} />} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {relatedPosts.map((post) => (
            <ArticleCard key={post.id} news={post} showReadMore />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedPosts;