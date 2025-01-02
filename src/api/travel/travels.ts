import {
  Filters,
  Travel,
  TravelDetail,
  TravelFilterResponse,
} from '@/@types/travel';
import buildTravelUrl from '@/utils/buildTravelUrl';
import { ApiResponse } from '@/@types/api';
import { http } from '../fetcher';

export const postTravelParticipation = (travelId: number) => {
  return http.post<any>(`/travels/participation?id=${travelId}`);
};

export const deleteTravelParticipation = (travelId: number) => {
  return http.delete<any>(`/travels/participation?id=${travelId}`);
};

export const deleteTravel = (travelId: number) => {
  return http.delete<any>(`/travels?id=${travelId}`);
};

export const getPopularTravel = () => {
  return http.get<ApiResponse<Travel[]>>('/travels/popular');
};

export const getTravelDetail = ({ id }: { id: string }) => {
  return http.get<ApiResponse<TravelDetail>>(`/travels/detail/${id}`);
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
