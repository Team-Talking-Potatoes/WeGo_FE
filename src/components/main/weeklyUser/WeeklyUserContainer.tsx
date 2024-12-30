import { getPopularUser } from '@/api/user/userList';
import { QUERY_KEYS } from '@/constants/querykeys';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import WeeklyUser from './WeeklyUser';

const WeeklyUserContainer = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.USER.POPULAR_USER,
    queryFn: getPopularUser,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklyUser />
    </HydrationBoundary>
  );
};
export default WeeklyUserContainer;
