export interface APIError extends Error {
  status: number;
  message: string;
}
