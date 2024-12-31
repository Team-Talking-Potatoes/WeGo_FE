import { getUserInfo } from '@/api/user/userInfoApi';
import { useQuery } from '@tanstack/react-query';

const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetUser;
