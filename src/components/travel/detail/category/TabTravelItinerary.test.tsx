import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TabTravelItinerary from './TabTravelItinerary';

const mockTripDuration = 3;
const mockStartAt = '2024-12-10';
const mockTravelPlan = [
  {
    tripDay: 1,
    tripOrderNumber: 1,
    destination: '서울',
    description: '서울 탐방',
    travelPlanImage: '/test1.png',
  },
  {
    tripDay: 2,
    tripOrderNumber: 1,
    destination: '부산',
    description: '부산 여행',
    travelPlanImage: '/test1.png',
  },
  {
    tripDay: 3,
    tripOrderNumber: 1,
    destination: '제주도',
    description: '제주도 여행',
    travelPlanImage: '/test1.png',
  },
];

const renderTabTravelItinerary = () =>
  render(
    <TabTravelItinerary
      tripDuration={mockTripDuration}
      travelPlan={mockTravelPlan}
      startAt={mockStartAt}
    />,
  );

describe('TabTravelItinerary', () => {
  beforeEach(() => renderTabTravelItinerary());

  it('여행 "Day number"이 렌더링됩니다', () => {
    expect(screen.getByText('Day 1')).toBeInTheDocument();
    expect(screen.getByText('Day 2')).toBeInTheDocument();
    expect(screen.getByText('Day 3')).toBeInTheDocument();
  });

  it('여행 "Day number"이 없으면 렌더링하지 않습니다', () => {
    expect(screen.queryByText('Day 4')).not.toBeInTheDocument();
  });

  it('상세 일정 확인 버튼이 렌더링됩니다', () => {
    expect(screen.getAllByText('상세 일정 확인')).toHaveLength(3);
  });

  it('상세 일정 확인 버튼을 클릭하면 세부 일정이 토글됩니다', () => {
    // 처음에는 세부 일정이 보이지 않음
    expect(screen.queryByText('서울 탐방')).not.toBeInTheDocument();

    // Day 1 클릭하여 세부 일정이 보이도록 토글
    fireEvent.click(screen.getByText('Day 1'));
    expect(screen.getByText('서울 탐방')).toBeInTheDocument();

    // Day 1 클릭하여 세부 일정이 다시 숨겨짐
    fireEvent.click(screen.getByText('Day 1'));
    expect(screen.queryByText('서울 탐방')).not.toBeInTheDocument();
  });
});
