import { getUserInfo, UserInfo } from '@/api/user/userInfo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FetcherError } from '@/@types/api';

const useGetUser = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<UserInfo, FetcherError>({
    queryKey: ['user'],
    queryFn: getUserInfo,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: (failureCount, fetchError) => {
      if (fetchError?.status === 401) {
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
