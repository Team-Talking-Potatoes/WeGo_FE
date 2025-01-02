import {
  checkedTravel,
  mySelfTravel,
  pastTravel,
  upcommingTravel,
  writableTravel,
} from '@/api/travel/travels';
import { useQuery } from '@tanstack/react-query';

const useUpcommingTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['upcommingTravel', limit, offset],
    queryFn: () => upcommingTravel(limit, offset),
  });
};

const usePastTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['pastTravel', limit, offset],
    queryFn: () => pastTravel(limit, offset),
  });
};

const useCheckedTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['checkedTravel', limit, offset],
    queryFn: () => checkedTravel(limit, offset),
  });
};

const useWritableTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['writableTravel', limit, offset],
    queryFn: () => writableTravel(limit, offset),
  });
};

const useMySelfTravel = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['mySelfTravel', limit, offset],
    queryFn: () => mySelfTravel(limit, offset),
  });
};

export {
  useUpcommingTravel,
  usePastTravel,
  useCheckedTravel,
  useWritableTravel,
  useMySelfTravel,
};
