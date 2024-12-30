import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import WeeklyPopular from './WeeklyPopular';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn().mockReturnValue({
    mutate: jest.fn(),
    onError: jest.fn(),
  }),
}));

jest.mock('@/utils/dateChageKr', () => ({
  getWeekNumber: jest.fn(() => 12),
  formatDateToShortWithDay: jest.fn(),
}));

describe('WeeklyPopular', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('로딩 중일 때 로딩 메시지를 표시합니다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: false,
      error: null,
    });

    render(<WeeklyPopular />);
    expect(screen.getByText('로딩중 WeeklyPopular')).toBeInTheDocument();
  });

  it('데이터가 있으면 TravelCardBig 컴포넌트를 렌더링합니다', () => {
    const mockTravelList = [
      {
        travelId: 1,
        image: '/travel1.jpg',
        isDomestic: true,
        travelName: '서울 여행',
        location: '서울',
        maxTravelMateCount: 10,
        currentTravelMateCount: 5,
        startAt: '2024.12.01',
        endAt: '2024.12.07',
      },
      {
        travelId: 2,
        image: '/travel2.jpg',
        isDomestic: false,
        travelName: '파리 여행',
        location: '파리',
        maxTravelMateCount: 8,
        currentTravelMateCount: 6,
        startAt: '2024.12.15',
        endAt: '2024.12.22',
      },
    ];

    (useQuery as jest.Mock).mockReturnValue({
      data: mockTravelList,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(<WeeklyPopular />);
    expect(screen.getByText('서울 여행')).toBeInTheDocument();
    expect(screen.getByText('파리 여행')).toBeInTheDocument();
  });

  it('에러가 발생하면 에러 메시지를 표시합니다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      error: { message: '네트워크 오류' },
    });

    render(<WeeklyPopular />);
    expect(
      screen.getByText(
        '데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('네트워크 오류')).toBeInTheDocument();
  });
});
