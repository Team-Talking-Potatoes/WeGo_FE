export interface APIError extends Error {
  status: number;
  message: string;
}

export interface FetcherError extends Error {
  status?: number;
}

export interface BaseResponse<T> {
  status: string;
  data: T;
}

export interface ListResponse<T> {
  status: string;
  data: T[];
  total: number;
  currentPage: number;
  hasNext: boolean;
}
