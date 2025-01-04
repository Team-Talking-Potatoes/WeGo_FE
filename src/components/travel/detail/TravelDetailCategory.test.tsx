import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  useBookmarkTravel,
  useDeleteBookmarkTravel,
} from '@/queries/travel/useBookmarkTravel';
import useGetUser from '@/queries/user/useGetUser';
import TravelDetailCategory from './TravelDetailCategory';

jest.mock('@/queries/travel/useBookmarkTravel');
jest.mock('@/queries/user/useGetUser');

const mockHashTags = '#여행#즐거움';
const mockDescription = '멋진 여행입니다!';
const mockTripDuration = 3;
const mockTravelPlan = [
  {
    tripDay: 1,
    tripOrderNumber: 1,
    destination: '서울',
    description: '서울 탐방',
    image: '/test1.png',
  },
  {
    tripDay: 2,
    tripOrderNumber: 1,
    destination: '부산',
    description: '부산 여행',
    image: '/test1.png',
  },
];
const mockStartAt = '2024-12-10';
const mockEndAt = '2024-12-20';

describe('TravelDetailCategory', () => {
  (useGetUser as jest.Mock).mockReturnValue({
    data: null,
  });
  (useBookmarkTravel as jest.Mock).mockReturnValue({ mutate: jest.fn() });
  (useDeleteBookmarkTravel as jest.Mock).mockReturnValue({
    mutate: jest.fn(),
  });

  const renderComponent = (endAt = mockEndAt) =>
    render(
      <TravelDetailCategory
        travelId={1}
        hashTags={mockHashTags}
        participationFlag
        description={mockDescription}
        tripDuration={mockTripDuration}
        travelPlan={mockTravelPlan}
        startAt={mockStartAt}
        endAt={endAt}
        isBookmark
      />,
    );

  it('초기 상태에서 여행 상세 탭이 렌더링됩니다.', () => {
    renderComponent();

    expect(screen.getByText(mockDescription)).toBeInTheDocument();
    expect(screen.getByText('# 여행')).toBeInTheDocument();
    expect(screen.getByText('# 즐거움')).toBeInTheDocument();
  });

  it('종료 날짜가 지난 경우 모임 리뷰 탭이 렌더링됩니다.', () => {
    renderComponent('2024-12-05');
    expect(screen.getByText('모임리뷰')).toBeInTheDocument();
  });

  it('여행 상세 및 일정 탭에서 여행 버튼이 렌더링됩니다.', () => {
    renderComponent();
    expect(screen.getByText('여행상세')).toBeInTheDocument();
    fireEvent.click(screen.getByText('여행일정'));
    expect(screen.getByText('여행일정')).toBeInTheDocument();
  });

  it('종료 날짜가 지나지 않은 경우 모임 리뷰 탭이 표시되지 않습니다.', () => {
    renderComponent('2500-12-05');
    expect(screen.queryByText('모임리뷰')).not.toBeInTheDocument();
  });
});
