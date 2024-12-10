import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { server } from '@/mocks/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { getTravelDetail } from '@/api/travelApi';
import TravelDetail from './TravelDetail';

describe('WeeklyPopular', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const id = '1';

  it('여행 상세 데이터를 불러와 여행 정보가 표시된다', async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['travels', { id }],
      queryFn: () => getTravelDetail({ id }),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback="로딩중">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <TravelDetail id={id} />
          </HydrationBoundary>
        </Suspense>
      </QueryClientProvider>,
    );

    // 여행 상세 정보가 잘 표시되는지 확인
    expect(
      await screen.findByText('12월에 떠나는 겨울여행'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('2024.12.03 - 2024.12.06'),
    ).toBeInTheDocument();
    expect(await screen.findByText('10명')).toBeInTheDocument();
    expect(await screen.findByText('2024.11.31')).toBeInTheDocument();
    expect(await screen.findByText('마감된 여행입니다.')).toBeInTheDocument();
  });

  it('여행 상세 정보를 SelectTravelDetail 컴포넌트에서 제대로 렌더링한다', async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['travels', { id }],
      queryFn: () => getTravelDetail({ id }),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback="로딩중">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <TravelDetail id={id} />
          </HydrationBoundary>
        </Suspense>
      </QueryClientProvider>,
    );

    // SelectTravelDetail에서 렌더링되는 데이터 확인
    expect(await screen.findByText('녹차라떼 아이스')).toBeInTheDocument();
    expect(await screen.findByText('# 겨울여행')).toBeInTheDocument();
  });

  it('여행 일정(SelectTravelItinerary) 버튼 클릭 시 렌더링된다', async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['travels', { id }],
      queryFn: () => getTravelDetail({ id }),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback="로딩중">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <TravelDetail id={id} />
          </HydrationBoundary>
        </Suspense>
      </QueryClientProvider>,
    );

    // '여행일정' 버튼 클릭 후 'SelectTravelItinerary' 컴포넌트 렌더링 확인
    fireEvent.click(screen.getByText('여행일정'));
    expect(await screen.findByText('Day 1')).toBeInTheDocument();
    const details = await screen.findAllByText('상세 일정 확인');
    expect(details).toHaveLength(3);
  });
});
