export interface APIError extends Error {
  status: number;
  message: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}
