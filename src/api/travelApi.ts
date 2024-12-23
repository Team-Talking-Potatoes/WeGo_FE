import {
  Filters,
  Travel,
  TravelDetail,
  TravelFilterResponse,
} from '@/@types/travel';
import { APIError } from '@/@types/api';
import buildTravelUrl from '@/utils/buildTravelUrl';

const handleResponse = async (response: Response, callName: string) => {
  if (!response.ok) {
    const error = new Error(`Get travel data failed: ${callName}`) as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }
  return response.json();
};

export const getPopularTravel = async (): Promise<Travel[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/popular`,
  );
  return handleResponse(response, 'getPopularTravel');
};

export const getTravelDetail = async ({
  id,
}: {
  id: string;
}): Promise<TravelDetail> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/detail/${id}`,
  );
  return handleResponse(response, 'getTravelDetail');
};

export const getTravels = async ({
  pageParam,
  ...rest
}: {
  pageParam?: number;
} & Filters): Promise<TravelFilterResponse> => {
  const page = pageParam && pageParam !== 1 ? `&page=${pageParam}` : '';
  const url = buildTravelUrl(rest) + page;
  const response = await fetch(url);
  return handleResponse(response, 'getTravels');
};

export const postTravelBookMark = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/bookmark?id=${id}`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );
  return handleResponse(response, 'postTravelBookMark');
};

export const deleteTravelBookMark = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/bookmark?id=${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );
  return handleResponse(response, 'postTravelBookMark');
};
