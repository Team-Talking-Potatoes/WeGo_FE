import {
  Filters,
  Travel,
  TravelDetail,
  TravelFilterResponse,
  MyTravel,
  MyTravelResponse,
} from '@/@types/travel';
import buildTravelUrl from '@/utils/buildTravelUrl';
import { ApiResponse } from '@/@types/api';
import { http } from '../fetcher';

export const postTravelParticipation = (travelId: number) => {
  return http.post<any>(`/travels/${travelId}/participation`);
};

export const deleteTravelParticipation = (travelId: number) => {
  return http.delete<any>(`/travels/${travelId}/participation`);
};

export const deleteTravel = (travelId: number) => {
  return http.delete<any>(`/travels/${travelId}`);
};

export const getPopularTravel = () => {
  return http.get<ApiResponse<Travel[]>>('/travels/popular');
};

export const getTravelDetail = ({ id }: { id: string }) => {
  return http.get<ApiResponse<TravelDetail>>(`/travels/${id}`);
};

export const getTravels = (props: Filters & { pageParam?: number }) => {
  const { pageParam, ...filters } = props;
  const url = buildTravelUrl(filters, pageParam);
  return http.get<ApiResponse<TravelFilterResponse>>(url);
};

export const postTravelBookMark = (id: number) => {
  return http.post<any>(`/travels/bookmark?travelId=${id}`);
};

export const deleteTravelBookMark = (id: number) => {
  return http.delete<any>(`/travels/bookmark?travelId=${id}`);
};

/* ----------------------------- Apis in mypage ----------------------------- */
export const upcommingTravel = (limit: number, offset: number) => {
  return http.get<MyTravelResponse>(
    `/travels/status?travelStatus=UPCOMING&size=${limit}&page=${offset}`,
  );
};

export const pastTravel = (limit: number, offset: number) => {
  return http.get<MyTravelResponse>(
    `/travels/status?travelStatus=PAST&size=${limit}&page=${offset}`,
  );
};

export const checkedTravel = (limit: number, offset: number) => {
  return http.get<MyTravelResponse>(
    `/travels/checked?size=${limit}&page=${offset}`,
  );
};

export const writableTravel = (limit: number, offset: number) => {
  return http.get<MyTravel>(
    `/travels/reviews/pending?size=${limit}&page=${offset}`,
  );
};

export const mySelfTravel = (limit: number, offset: number) => {
  return http.get<MyTravelResponse>(
    `/travels/created?size=${limit}&page=${offset}`,
  );
};
