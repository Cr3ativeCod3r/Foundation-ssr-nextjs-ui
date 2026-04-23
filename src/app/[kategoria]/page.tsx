import { fetchCategoryPosts, fetchCategoryBySlug } from '@/api/categories';
import CategoryPosts from '@/Components/Category/CategoryPosts';
import MigraineBanner from '@/Components/CategoryBanners/MigrenaBanner';
import { notFound } from 'next/navigation';
import { Brain } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{ kategoria: string }>;
  searchParams?: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { kategoria } = await params;
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const page = Number.isNaN(Number(pageParam)) ? 1 : parseInt(pageParam || '1', 10);

  try {
    const category = await fetchCategoryBySlug(kategoria);
    if (!category) return notFound();

    const postsResponse = await fetchCategoryPosts(kategoria, page, 6);

    return (
      <div className="container mx-auto px-4 py-8 min-h-screen animate-fade-in">
        {/* Category header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <Brain className="text-teal-600" size={20} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{category.name}</h1>
        </div>
        <div className="h-px bg-gradient-to-r from-slate-200 to-transparent mb-6" />

        {kategoria === 'migrena' && <MigraineBanner />}

        <CategoryPosts
          initialPosts={postsResponse.data}
          initialPagination={postsResponse.meta.pagination}
          categorySlug={kategoria}
        />
      </div>
    );
  } catch (error) {
    console.error('[CategoryPage] Error:', error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Błąd</h1>
        <p className="text-slate-500">Nie udało się załadować kategorii. Spróbuj ponownie później.</p>
      </div>
    );
  }
}