'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCategories } from '@/api/categories';
import Skeleton from '@/components/ui/Skeleton';
import type { Category } from '@/types/news';

const EXCLUDED_CATEGORIES = ['projekty', 'aktualnosci'];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetched = await fetchCategories();
        setCategories(
          fetched.filter((cat) => !EXCLUDED_CATEGORIES.includes(cat.slug)),
        );
      } catch (error) {
        console.error('[CategoriesPage] Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-b from-teal-50 to-white border-b border-teal-100">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Kategorie chorób
          </h1>
          <p className="text-sm text-slate-500">
            Wybierz kategorię, aby zobaczyć powiązane artykuły
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-10">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} variant="card" height={120} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 stagger-children">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="block group"
              >
                <div className="card-elevated overflow-hidden h-full">
                  {category.imageUrl && (
                    <div className="relative h-20 overflow-hidden">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                  <div className="p-3 text-center">
                    <h2 className="text-sm font-semibold text-slate-700 group-hover:text-teal-700 transition-colors">
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}