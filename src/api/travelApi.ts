import {
  Filters,
  Travel,
  TravelDetail,
  TravelFilterResponse,
} from '@/@types/travel';
import buildTravelUrl from '@/utils/buildTravelUrl';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const fetchPopularTravel = async (): Promise<Travel[]> => {
  const response = await fetch('/api/travels/popular');
  return handleResponse(response);
};

export const getTravelDetail = async ({
  id,
}: {
  id: string;
}): Promise<TravelDetail> => {
  const response = await fetch(`/api/travels/${id}`);
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
