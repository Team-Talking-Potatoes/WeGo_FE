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
import { getPopularReview } from '@/api/reviewApi';
import WeeklyReview from './WeeklyReview';

describe('WeeklyReview', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('리뷰 데이터를 불러와 WeeklyReview 컴포넌트를 렌더링한다', async () => {
    const queryClient = new QueryClient();
    const queryKey = QUERY_KEYS.REVIEW.popularReview;
    await queryClient.prefetchQuery({
      queryKey,
      queryFn: getPopularReview,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback="로딩중">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <WeeklyReview />
          </HydrationBoundary>
        </Suspense>
      </QueryClientProvider>,
    );

    expect(await screen.findByText('여행리뷰 모아보기')).toBeInTheDocument();
    expect(
      await screen.findByText('다양한 여행모임 후기들을 한눈에 확인해요!'),
    ).toBeInTheDocument();
  });
});
