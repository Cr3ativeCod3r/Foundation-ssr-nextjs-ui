import { type BlocksContent } from '@strapi/blocks-react-renderer';

export interface NewsItem {
    id: number;
    yt_link: string;
    header: string;
    description: string | null;
    category: {
        slug: string;
        name: string;
    };
    content: BlocksContent;
    slug: string;
    imageUrl: string;
    createdAt: string;
    gallery: {
        url: string;
    }[]; 
}
export type ApiResponseItem = {
    id: number;
    header: string;
    description: string;
    category: {
        cover_image?: {
        formats: {
            small: { url: string };
            medium: { url: string };
            large: { url: string };
        };
    }
        slug: string;
        name: string;
    };
    image?: {
        url: string;
    };
    slug: string;
    createdAt: string;
    content: BlocksContent;
    yt_link: string;
    gallery: string[];
    publishedAt: string;
    author: {
        name: string;
        image: {
            url: string;
        }
    };
};

export interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}


export interface Category {
    name: string;
    slug: string;
    imageUrl?: string;
    cover_image?: {
        url: string;
        formats: {
            small: { url: string };
            medium: { url: string };
            large: { url: string };
        };
    };
}

export interface PostsResponse {
    data: NewsItem[];
    meta: {
        pagination: PaginationMeta;
    };
}

// types/banner.ts
export interface BannerItem {
    id: number;
    link: string;
    imageUrl: string;
  }