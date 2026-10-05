'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategoryPosts } from '@/api/categories';
import ArticleCard from '@/components/ui/Card';
import Pagination from '@/components/ui/Pagination';
import { ArticleCardSkeleton } from '@/components/ui/Skeleton';
import type { NewsItem, PaginationMeta } from '@/types/news';

interface CategoryPostsProps {
  initialPosts: NewsItem[];
  initialPagination: PaginationMeta;
  categorySlug: string;
}

export default function CategoryPosts({
  initialPosts,
  initialPagination,
  categorySlug,
}: CategoryPostsProps) {
  const [posts, setPosts] = useState<NewsItem[]>(initialPosts);
  const [pagination, setPagination] = useState<PaginationMeta>(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > pagination.pageCount) return;

    setIsLoading(true);
    try {
      router.push(`/${categorySlug}?page=${newPage}`, { scroll: true });
      const postsResponse = await fetchCategoryPosts(categorySlug, newPage, pagination.pageSize);
      setPosts(postsResponse.data);
      setPagination(postsResponse.meta.pagination);
    } catch (error) {
      console.error('[CategoryPosts] Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-slate-500">Brak postów w tej kategorii.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 stagger-children">
        {posts.map((post) => (
          <ArticleCard key={post.id} news={post} showReadMore />
        ))}
      </div>

      <Pagination
        currentPage={pagination.page}
        pageCount={pagination.pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}