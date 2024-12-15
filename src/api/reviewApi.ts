import { Review } from '@/@types/review';

interface MyReviewError extends Error {
  status?: number;
  message: string;
}

interface MyReview {
  total: number;
  reviews: Review[];
}

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
    const error = new Error('Login failed') as MyReviewError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }
  return res.json();
};

export const createReview = async (formData: FormData) => {
  const response = await fetch(`/api/reviews/create`, {
    method: 'POST',
    // credentials: 'include',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('리뷰 생성에 실패했습니다.');
  }

  return response.json();
};
