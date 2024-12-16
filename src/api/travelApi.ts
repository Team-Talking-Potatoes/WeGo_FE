import {
  Filters,
  Travel,
  TravelDetail,
  TravelFilterResponse,
} from '@/@types/travel';
import { APIError } from '@/@types/api';
import buildTravelUrl from '@/utils/buildTravelUrl';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = new Error('Get travel detail failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }
  return response.json();
};

export const fetchPopularTravel = async (): Promise<Travel[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/popular`,
  );
  return handleResponse(response);
};

export const getTravelDetail = async ({
  id,
}: {
  id: string;
}): Promise<TravelDetail> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/${id}`,
  );
  return handleResponse(response);
};

export const getTravels = async ({
  pageParam,
  ...rest
}: {
  pageParam?: any;
} & Filters): Promise<TravelFilterResponse> => {
  const page = `&page=${pageParam}` || '';
  const url = buildTravelUrl(rest) + page;
  const response = await fetch(url);
  return handleResponse(response);
};
