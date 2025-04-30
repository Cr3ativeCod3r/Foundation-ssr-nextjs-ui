'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategoryPosts } from '@/api/categories';
import PostCard from './PostCard';
import Pagination from './Pagination';
import { NewsItem, PaginationMeta } from "@/types/news";

interface CategoryPostsProps {
  initialPosts: NewsItem[];
  initialPagination: PaginationMeta;
  categorySlug: string;
}

export default function CategoryPosts({ 
  initialPosts, 
  initialPagination, 
  categorySlug 
}: CategoryPostsProps) {
  const [posts, setPosts] = useState<NewsItem[]>(initialPosts);
  const [pagination, setPagination] = useState<PaginationMeta>(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > pagination.pageCount) return;
    setIsLoading(true);
    try {
      router.push(`/${categorySlug}?page=${newPage}`);
      const postsResponse = await fetchCategoryPosts(categorySlug, newPage, pagination.pageSize);
      setPosts(postsResponse.data);
      setPagination(postsResponse.meta.pagination);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No posts found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {pagination.pageCount > 1 && (
            <Pagination 
              currentPage={pagination.page} 
              pageCount={pagination.pageCount} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
}