import { getPopularUser } from '@/api/user/userList';
import { QUERY_KEYS } from '@/constants/querykeys';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import WeeklyUser from './WeeklyUser';

const WeeklyUserContainer = async () => {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: QUERY_KEYS.USER.POPULAR_USER,
    queryFn: getPopularUser,
  });
  return (
    <Suspense fallback={<div>로딩중</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WeeklyUser userList={data} />
      </HydrationBoundary>
    </Suspense>
  );
};
export default WeeklyUserContainer;
