import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TabContents from './TabContents';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

jest.mock('@/queries/travel/useGetMyTravel', () => ({
  useMySelfTravel: () => ({
    isLoading: false,
    data: {
      data: {
        content: [
          {
            travelId: 11,
            travelName: '도쿄에서 즐기는 미식여행',
            expectedTripCost: 1000000,
            travelMateCount: 11,
            isDomestic: true,
            travelStatus: '예정',
            location: '도쿄시',
            image: '/test/travel/test1.jpg',
            startAt: '2024.12.11',
            endAt: '2024.12.11',
            maxTravelMateCount: 12,
            currentTravelMateCount: 11,
          },
        ],
        total: 1,
      },
    },
  }),
  useWritableTravel: () => ({
    isLoading: false,
    data: {
      data: {
        content: [],
        total: 0,
      },
    },
  }),
  useCheckedTravel: () => ({
    isLoading: false,
    data: {
      data: {
        content: [],
        total: 3,
      },
    },
  }),
  usePastTravel: () => ({
    isLoading: false,
    data: {
      data: {
        content: [],
        total: 3,
      },
    },
  }),
  useUpcommingTravel: () => ({
    isLoading: false,
    data: {
      data: {
        content: [],
        total: 3,
      },
    },
  }),
}));

describe('TabContents', () => {
  it('선택된 서브탭이 "upcomming"일 때 Upcomming 컴포넌트를 렌더링한다', () => {
    const { getByTestId } = renderWithQueryClient(
      <TabContents selectedSubTab="upcomming" />,
    );
    expect(getByTestId('upcomming-travels')).toBeInTheDocument();
  });

  it('선택된 서브탭이 "pastTravel"일 때 PastTravel 컴포넌트를 렌더링한다', () => {
    const { getByTestId } = renderWithQueryClient(
      <TabContents selectedSubTab="pastTravel" />,
    );
    expect(getByTestId('past-travels')).toBeInTheDocument();
  });

  it('선택된 서브탭이 "checkedTravel"일 때 CheckedTravel 컴포넌트를 렌더링한다', () => {
    const { getByTestId } = renderWithQueryClient(
      <TabContents selectedSubTab="checkedTravel" />,
    );
    expect(getByTestId('checked-travels')).toBeInTheDocument();
  });

  it('선택된 서브탭이 "writable"일 때 Writable 컴포넌트를 렌더링한다', () => {
    const { getByTestId } = renderWithQueryClient(
      <TabContents selectedSubTab="writable" />,
    );
    expect(getByTestId('writable-travels')).toBeInTheDocument();
  });

  it('선택된 서브탭이 "written"일 때 Written 컴포넌트를 렌더링한다', () => {
    const { getByTestId } = renderWithQueryClient(
      <TabContents selectedSubTab="written" />,
    );
    expect(getByTestId('written-reviews')).toBeInTheDocument();
  });

  it('선택된 서브탭이 "mySelfTravel"일 때 MySelfTravel 컴포넌트를 렌더링한다', () => {
    const { getByTestId } = renderWithQueryClient(
      <TabContents selectedSubTab="mySelfTravel" />,
    );
    expect(getByTestId('my-self-travels')).toBeInTheDocument();
  });
});
