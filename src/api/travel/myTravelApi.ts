import { TravelList } from '@/@types/travel';
import { ApiResponse } from '@/@types/api';
import { http } from '../fetcher';

interface MyTravel {
  travels: TravelList[];
  total: number;
}

export const upcommingTravel = (limit: number, offset: number) => {
  return http.get<ApiResponse<MyTravel>>(
    `/travels/scheduled?limit=${limit}&offset=${offset}`,
  );
};

export const pastTravel = (limit: number, offset: number) => {
  return http.get<ApiResponse<MyTravel>>(
    `/travels/finished?limit=${limit}&offset=${offset}`,
  );
};

export const checkedTravel = (limit: number, offset: number) => {
  return http.get<ApiResponse<MyTravel>>(
    `/travels/checked?limit=${limit}&offset=${offset}`,
  );
};

export const writableTravel = (limit: number, offset: number) => {
  return http.get<ApiResponse<MyTravel>>(
    `/travels/reviews/pending?limit=${limit}&offset=${offset}`,
  );
};

export const mySelfTravel = (limit: number, offset: number) => {
  return http.get<ApiResponse<MyTravel>>(
    `/travels/created?limit=${limit}&offset=${offset}`,
  );
};

export const bookmarkTravel = (id: number) => {
  return http.post<any>('/travels/bookmark', { travelId: id });
};
