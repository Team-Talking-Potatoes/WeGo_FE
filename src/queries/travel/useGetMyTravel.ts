import {
  checkedTravel,
  mySelfTravel,
  pastTravel,
  upcommingTravel,
  writableTravel,
} from '@/api/travel/travels';
import { useQuery } from '@tanstack/react-query';

// 유저의 인터렉션이 아니면 리페칭할 필요가 없는 데이터들
// 유저 인터렉션 로직에서 invalidate 필요.
const MyTravelQueryOptions = {
  staleTime: 1000 * 60 * 30,
  gcTime: 1000 * 60 * 30,
  retry: 1,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
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
