import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TravelInformation from './TravelInformation';

describe('TravelInformation', () => {
  const travelDetail = {
    location: '제주도',
    name: '제주도 여행',
    image: '/test.png',
    isDomestic: true,
    minTravelMateCount: 5,
    maxTravelMateCount: 10,
    startAt: '2024.12.01',
    endAt: '2024.12.10',
    participant: [
      { id: 1, nickname: '1', role: 'string', profileImage: 'string' },
      { id: 2, nickname: '2', role: 'string', profileImage: 'string' },
      { id: 3, nickname: '3', role: 'string', profileImage: 'string' },
    ],
    registrationEnd: '2024.11.30',
  };

  const renderComponent = () =>
    render(
      <TravelInformation
        travelLocation={travelDetail.location}
        travelName={travelDetail.name}
        isDomestic={travelDetail.isDomestic}
        minTravelMateCount={travelDetail.minTravelMateCount}
        maxTravelMateCount={travelDetail.maxTravelMateCount}
        startAt={travelDetail.startAt}
        endAt={travelDetail.endAt}
        registrationEnd={travelDetail.registrationEnd}
        participant={travelDetail.participant}
      />,
    );

  it('여행 이름이 렌더링됩니다.', () => {
    renderComponent();
    expect(screen.getByText('제주도 여행')).toBeInTheDocument();
  });

  it('여행 태그가 표시됩니다.', () => {
    renderComponent();
    expect(screen.getByText('국내여행')).toBeInTheDocument();
  });

  it('날짜 정보가 렌더링됩니다.', () => {
    renderComponent();
    expect(
      screen.getByText('2024.12.01(일) - 2024.12.10(화)'),
    ).toBeInTheDocument();
  });

  it('모집 정원과 모집 기한이 표시됩니다.', () => {
    renderComponent();

    expect(screen.getByText('모집정원')).toBeInTheDocument();
    expect(screen.getByText('10명')).toBeInTheDocument();
    expect(screen.getByText('모집기한')).toBeInTheDocument();
    expect(screen.getByText('2024.11.30(토)')).toBeInTheDocument();
  });
});
