import { getUserInfo } from '@/api/user/userInfo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FetcherError, BaseResponse } from '@/@types/api';
import { User } from '@/@types/user';

const useGetUser = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<
    BaseResponse<User>,
    FetcherError,
    User
  >({
    queryKey: ['user'],
    queryFn: getUserInfo,
    select: (response) => response.data,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: (failureCount, fetchError) => {
      if (fetchError?.status === 400) {
        return false;
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (error?.status === 401) {
      queryClient.removeQueries({ queryKey: ['user'] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return { data, isLoading, error };
};

export default useGetUser;
