import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TravelPlanCard from './TravelPlanCard';

const mockPlan = {
  image: 'https://example.com/image.jpg',
  destination: '대전 성심당',
  description: '웨이팅 1시간 예상, 빵 종류별로 사기',
};

const renderTravelPlanCard = (overrides = {}) => {
  const props = {
    ...mockPlan,
    ...overrides,
  };
  render(
    <TravelPlanCard
      image={props.image}
      destination={props.destination}
      description={props.description}
    />,
  );
};

describe('TravelPlanCard를 올바르게 렌더링합니다', () => {
  beforeEach(() => renderTravelPlanCard());

  it('여행일정 이미지를 렌더링합니다.', () => {
    const planImage = screen.getByAltText(
      `${mockPlan.destination} 일정 이미지`,
    );
    expect(planImage).toBeInTheDocument();
  });

  it('여행일정 제목과 설명를 렌더링합니다.', () => {
    // 일정 제목
    expect(screen.getByText('대전 성심당')).toBeInTheDocument();
    // 설명
    expect(
      screen.getByText('웨이팅 1시간 예상, 빵 종류별로 사기'),
    ).toBeInTheDocument();
  });
});

describe('TravelPlanCard가 올바르게 렌더링되지 않습니다', () => {
  it('여행일정 이미지가 없을 경우, 이미지를 렌더링하지 않습니다', () => {
    renderTravelPlanCard({ image: '', destination: '' });
    const planImage = screen.queryByAltText(
      `${mockPlan.destination} 일정 이미지`,
    );
    expect(planImage).not.toBeInTheDocument();
  });

  it('여행일정 제목이 없을 경우, 제목을 렌더링하지 않습니다', () => {
    renderTravelPlanCard({ destination: '' });
    const title = screen.queryByText(mockPlan.destination);
    expect(title).not.toBeInTheDocument();
  });

  it('여행일정 설명이 없을 경우, 설명을 렌더링하지 않습니다', () => {
    renderTravelPlanCard({ description: '' });
    const description = screen.queryByText(mockPlan.description);
    expect(description).not.toBeInTheDocument();
  });
});
