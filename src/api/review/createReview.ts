import { APIError } from '@/@types/api';
import { Travel } from '@/@types/travel';

interface WritableTravelResponse {
  content: Travel[];
  total: number;
  currentPage: number;
  hasNext: boolean;
}

const handleResponse = async (response: Response, callName: string) => {
  if (!response.ok) {
    const error = new Error(`Get travel data failed: ${callName}`) as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }
  return response.json();
};

export const getWritableTravelReview = async (
  size: number,
  page: number,
): Promise<WritableTravelResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/reviews/pending?size=${size}&page=${page}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  return handleResponse(response, 'getWritableTravelReview');
};
