/**
 * Resposta genérica para APIs
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: any;
  };
}

/**
 * Modelo para erros da API
 */
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

/**
 * Resposta para operações de paginação
 */
export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Parâmetros para consultas com paginação
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Parâmetros para filtros genéricos
 */
export interface FilterParams {
  [key: string]: any;
  search?: string;
  fromDate?: Date | string;
  toDate?: Date | string;
}
