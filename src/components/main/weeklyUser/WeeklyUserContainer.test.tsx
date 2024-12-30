import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { server } from '@/mocks/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { QUERY_KEYS } from '@/constants/querykeys';
import { getPopularUser } from '@/api/user/userList';
import WeeklyUser from './WeeklyUser';

describe('WeeklyUser', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('유저 데이터를 불러와 WeeklyUser 컴포넌트를 렌더링한다', async () => {
    const queryClient = new QueryClient();
    const queryKey = QUERY_KEYS.REVIEW.POPULAR_REVIEW;
    await queryClient.prefetchQuery({
      queryKey,
      queryFn: getPopularUser,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback="로딩중">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <WeeklyUser />
          </HydrationBoundary>
        </Suspense>
      </QueryClientProvider>,
    );

    // 유저 카드
    expect(await screen.findByText('녹차라떼')).toBeInTheDocument();
    expect(
      await screen.findByText('모임장 11회 • 리뷰 25개'),
    ).toBeInTheDocument();
    expect(await screen.findByText('친절해요')).toBeInTheDocument();

    // 링크
    const link = await screen.findByLabelText('녹차라떼 프로필 보기');
    expect(link).toBeInTheDocument();
  });
});
