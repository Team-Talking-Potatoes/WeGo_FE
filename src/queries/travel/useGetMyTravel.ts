import { upcommingTravel } from '@/api/travel/myTravelApi';
import { useQuery } from '@tanstack/react-query';

const useGetMyTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['myTravel', limit, offset],
    queryFn: () => upcommingTravel(limit, offset),
  });
};

export default useGetMyTravel;
