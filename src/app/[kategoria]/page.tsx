

import { fetchCategoryPosts, fetchCategoryBySlug } from '@/api/categories';
import CategoryPosts from '@/Components/Category/CategoryPosts';
import MigraineBanner from '@/Components/CategoryBanners/MigrenaBanner';
import { notFound } from 'next/navigation';
import { FaBrain } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
    params: Promise<{
        kategoria: string;
    }>;
    searchParams?: Promise<{
        page?: string;
    }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { kategoria } = await params;
    const resolvedSearchParams = await searchParams;
    const pageParam = resolvedSearchParams?.page;
    const page = Number.isNaN(Number(pageParam)) ? 1 : parseInt(pageParam || '1', 10);

    try {
        const category = await fetchCategoryBySlug(kategoria);
        if (!category) {
            return notFound();
        }

        const postsResponse = await fetchCategoryPosts(kategoria, page, 6);

        return (
            <div className="container mx-auto px-4 py-8 min-h-screen">
                <div className="flex items-center gap-2 mb-4">
                    <FaBrain className="text-red-400 text-2xl" />
                    <h1 className="text-2xl text-gray-700 font-semibold">{category.name}</h1>
                </div>
                <hr className="border-gray-300 mb-6" />
                {kategoria === 'migrena' && <MigraineBanner />}

                <CategoryPosts
                    initialPosts={postsResponse.data}
                    initialPagination={postsResponse.meta.pagination}
                    categorySlug={kategoria}
                />
            </div>
        );
    } catch (error) {
        console.error("Error fetching category data:", error);
        return (
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-4">Error</h1>
                <p>Failed to load category content. Please try again later.</p>
            </div>
        );
    }
}