import { TravelList } from '@/@types/travel';
import { http } from '../fetcher';

interface MyTravel {
  travels: TravelList[];
  total: number;
}

export const upcommingTravel = (limit: number, offset: number) => {
  return http.get<MyTravel>(
    `/travels/scheduled?limit=${limit}&offset=${offset}`,
  );
};

export const pastTravel = (limit: number, offset: number) => {
  return http.get<MyTravel>(
    `/travels/finished?limit=${limit}&offset=${offset}`,
  );
};

export const checkedTravel = (limit: number, offset: number) => {
  return http.get<MyTravel>(`/travels/checked?limit=${limit}&offset=${offset}`);
};

export const writableTravel = (limit: number, offset: number) => {
  return http.get<MyTravel>(
    `/travels/reviews/pending?limit=${limit}&offset=${offset}`,
  );
};

export const mySelfTravel = (limit: number, offset: number) => {
  return http.get<MyTravel>(`/travels/created?limit=${limit}&offset=${offset}`);
};

export const bookmarkTravel = (id: number) => {
  return http.post<any>('/travels/bookmark', { travelId: id });
};
