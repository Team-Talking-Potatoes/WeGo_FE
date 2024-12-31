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
