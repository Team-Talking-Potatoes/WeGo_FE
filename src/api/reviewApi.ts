import { Review, ReviewResponse } from '@/@types/review';

interface ReviewParams {
  pageParam: number;
  sortOrder: string;
}

interface MyReview {
  total: number;
  reviews: Review[];
}

interface ReviewError extends Error {
  status?: number;
  message: string;
}

export const getReview = async ({
  pageParam,
  sortOrder,
}: ReviewParams): Promise<ReviewResponse> => {
  const res = await fetch(
    `/api/reviews?page=${pageParam}&sortBy=${sortOrder}&limit=12`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const error = new Error('Login failed') as ReviewError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }
  return res.json();
};

export const fetchPopularReview = async (): Promise<Review[]> => {
  const response = await fetch('/api/review/popular');
  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const getTravelReview = async ({
  id,
}: {
  id: string;
}): Promise<Review[]> => {
  const response = await fetch(`/api/review?id=${id}`);
  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const getMyReview = async (
  limit: number,
  offset: number,
): Promise<MyReview> => {
  const res = await fetch(
    `/api/reviews/published?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const error = new Error('Login failed') as ReviewError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }
  return res.json();
};
