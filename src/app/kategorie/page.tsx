'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCategories } from '@/api/categories';
import { Activity, Brain, BookOpen, LayoutGrid, Stethoscope } from 'lucide-react';
import Skeleton from '@/components/ui/Skeleton';
import PageHero from '@/components/ui/PageHero';
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
      <PageHero
        icon={LayoutGrid}
        eyebrow="Baza wiedzy"
        title="Kategorie chorób"
        description="Wybierz kategorię, aby zobaczyć rzetelne artykuły o objawach, diagnostyce i leczeniu."
        decorations={[Brain, Stethoscope, Activity, BookOpen]}
      />

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