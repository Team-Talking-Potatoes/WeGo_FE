import {
  Filters,
  Travel,
  TravelDetail,
  TravelFilterResponse,
} from '@/@types/travel';
import buildTravelUrl from '@/utils/buildTravelUrl';
import { http } from './fetcher';

export const getPopularTravel = () => {
  return http.get<Travel[]>('/travels/popular');
};

export const getTravelDetail = ({ id }: { id: string }) => {
  return http.get<TravelDetail>(`/travels/detail/${id}`);
};

export const getTravels = (props: Filters & { pageParam?: number }) => {
  const { pageParam, ...filters } = props;
  const url = buildTravelUrl(filters, pageParam);

  return http.get<TravelFilterResponse>(
    url.replace(process.env.NEXT_PUBLIC_BASE_URL!, ''),
  );
};

export const postTravelBookMark = (id: number) => {
  return http.post<any>(`/travels/bookmark?id=${id}`);
};

export const deleteTravelBookMark = (id: number) => {
  return http.delete<any>(`/travels/bookmark?id=${id}`);
};
