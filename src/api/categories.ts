const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
import { ApiResponseItem, Category, PostsResponse } from "@/types/news";

export async function fetchCategories(): Promise<Category[]> {
    const res = await fetch(`${API_URL}/categories`);
    const data = await res.json();

    return data.data.map((category: Category) => ({
        name: category.name,
        slug: category.slug,
    }));
}


export async function fetchCategoryPosts(
    slug: string,
    page: number = 1,
    pageSize: number = 12
): Promise<PostsResponse> {
    const res = await fetch(
        `${API_URL}/posts?filters[category][slug][$eq]=${slug}&populate[category][populate]=*&populate=image&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );

    if (!res.ok) {
        throw new Error('Failed to fetch category posts');
    }

    const response = await res.json();

    const data = response.data.map((item: ApiResponseItem) => ({
        id: item.id,
        header: item.header,
        description: item.description,
        category: {
            slug: item.category.slug,
        },
        imageUrl:
            (Array.isArray(item.image) && item.image.length > 0 && item.image[0]?.formats?.medium?.url) ||
            item.category?.cover_image?.url ||
            "",
        slug: item.slug,
        createdAt: item.createdAt,
    }));

    return {
        data,
        meta: response.meta
    };
}


export async function fetchCategoryBySlug(slug: string) {
    const res = await fetch(
        `${API_URL}/categories?filters[slug][$eq]=${slug}&populate=*`
    );

    if (!res.ok) {
        throw new Error('Failed to fetch category');
    }

    const response = await res.json();

    if (response.data.length === 0) {
        return null;
    }

    return {
        id: response.data[0].id,
        name: response.data[0].name,
        slug: response.data[0].slug
    };
}