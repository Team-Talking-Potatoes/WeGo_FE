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
  const data = await queryClient.fetchQuery({
    queryKey: QUERY_KEYS.USER.POPULAR_USER,
    queryFn: getPopularUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklyUser userList={data.data} />
    </HydrationBoundary>
  );
};
export default WeeklyUserContainer;
