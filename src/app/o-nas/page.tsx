'use client';

import axios from 'axios';
import ContentRenderer from '@/utils/ContentRender';
import { useEffect, useState } from 'react';
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import Skeleton from '@/components/ui/Skeleton';
import { API_URL } from '@/api/api-config';

export default function AboutPage() {
  const [content, setContent] = useState<BlocksContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${API_URL}/../o-fundacji`);
        setContent(response.data.data.content);
      } catch (error) {
        console.error('[AboutPage] Error fetching content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-b from-teal-50 to-white border-b border-teal-100">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            O Fundacji
          </h1>
          <p className="text-sm text-slate-500">
            Poznaj naszą misję, cele i zespół
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="card-elevated p-4 md:p-8 lg:w-2/3 mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton variant="text" count={3} />
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" count={5} />
              <Skeleton variant="text" count={4} />
            </div>
          ) : content ? (
            <ContentRenderer content={content} />
          ) : (
            <p className="text-center text-slate-500 py-8">
              Nie udało się załadować treści.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}