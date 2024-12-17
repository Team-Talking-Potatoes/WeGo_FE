import { getUserInfo } from '@/api/user/userInfoApi';
import { useQuery } from '@tanstack/react-query';

const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });
};

export default useGetUser;
