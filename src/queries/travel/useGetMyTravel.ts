import {
  checkedTravel,
  mySelfTravel,
  pastTravel,
  upcommingTravel,
  writableTravel,
} from '@/api/travel/travels';
import { useQuery } from '@tanstack/react-query';

const MyTravelQueryOptions = {
  staleTime: 1000 * 60 * 5,
  retry: 1,
};

const useUpcommingTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['upcommingTravel', limit, offset],
    queryFn: () => upcommingTravel(limit, offset),
    ...MyTravelQueryOptions,
  });
};

const usePastTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['pastTravel', limit, offset],
    queryFn: () => pastTravel(limit, offset),
    ...MyTravelQueryOptions,
  });
};

const useCheckedTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['checkedTravel', limit, offset],
    queryFn: () => checkedTravel(limit, offset),
    ...MyTravelQueryOptions,
  });
};

const useWritableTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['writableTravel', limit, offset],
    queryFn: () => writableTravel(limit, offset),
    ...MyTravelQueryOptions,
  });
};

const useMySelfTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['mySelfTravel', limit, offset],
    queryFn: () => mySelfTravel(limit, offset),
    ...MyTravelQueryOptions,
  });
};

export {
  useUpcommingTravel,
  usePastTravel,
  useCheckedTravel,
  useWritableTravel,
  useMySelfTravel,
};
