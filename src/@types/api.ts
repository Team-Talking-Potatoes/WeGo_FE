export interface APIError extends Error {
  status: number;
  message: string;
}

export interface FetcherError extends Error {
  status?: number;
}
