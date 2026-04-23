/**
 * Common shared types used across the application
 */

/** Represents the current loading state of an async operation */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/** Standard paginated API response wrapper */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

/** Pagination metadata from Strapi */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/** Generic error shape for API failures */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

/** Strapi image format object */
export interface ImageFormat {
  url: string;
  width?: number;
  height?: number;
}

/** Strapi image formats containing size variants */
export interface ImageFormats {
  small?: ImageFormat;
  medium?: ImageFormat;
  large?: ImageFormat;
  thumbnail?: ImageFormat;
}

/** Navigation link used in menus & footers */
export interface NavLink {
  name: string;
  path: string;
  icon?: React.ReactNode;
}
