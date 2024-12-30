import { getUserInfo } from '@/api/user/userInfoApi';
import { useQuery } from '@tanstack/react-query';

const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });
};

export default useGetUser;
