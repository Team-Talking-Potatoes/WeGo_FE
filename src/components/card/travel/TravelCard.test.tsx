import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TravelCard from './TravelCard';

const mock = {
  travelId: 12,
  isDomestic: true,
  travelName: '부여로 떠나는 다함께 시골투어',
  location: '충남 부여',
  maxTravelMateCount: 6,
  currentTravelMateCount: 1,
  startAt: '12/3',
  endAt: '12/20',
  formattedStartDate: '12/03',
  image: '/test/travel/test1.png',
};

const renderTravelCard = (overrides = {}) => {
  const props = {
    ...mock,
    ...overrides,
  };
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <TravelCard
        travelId={props.travelId}
        isDomestic={props.isDomestic}
        travelName={props.travelName}
        location={props.location}
        maxTravelMateCount={props.maxTravelMateCount}
        currentTravelMateCount={props.currentTravelMateCount}
        startAt={props.startAt}
        endAt={props.endAt}
        formattedStartDate={props.formattedStartDate}
        image={props.image}
      />
    </QueryClientProvider>,
  );
};

describe('TravelCard를 렌더링 합니다', () => {
  beforeEach(() => renderTravelCard());

  it('여행 이름을 렌더링합니다', () => {
    expect(
      screen.getByAltText(
        '부여로 떠나는 다함께 시골투어 - 충남 부여 여행 이미지',
      ),
    ).toBeInTheDocument();
  });

  it('여행 위치를 렌더링합니다', () => {
    expect(screen.getByText('충남 부여')).toBeInTheDocument();
  });

  it('참가자 정보를 렌더링합니다', () => {
    expect(screen.getByText('1/6')).toBeInTheDocument();
  });

  it('날짜를 렌더링합니다', () => {
    expect(screen.getByText('12/03')).toBeInTheDocument();
  });

  it('국내/해외 여행 라벨을 렌더링합니다', () => {
    expect(screen.getByText('해외여행')).toBeInTheDocument();
  });

  it('여행 링크를 렌더링합니다', () => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/travel/12');
  });

  it('여행 이미지를 렌더링합니다', () => {
    const travelImage = screen.getByAltText(
      '부여로 떠나는 다함께 시골투어 - 충남 부여 여행 이미지',
    );
    expect(travelImage).toBeInTheDocument();
  });
});

describe('TravelCard가 올바르게 렌더링 되지 않습니다', () => {
  it('여행 이미지가 없을 경우, 이미지를 렌더링하지 않습니다', () => {
    renderTravelCard({ image: '' });
    const travelImage = screen.queryByAltText(
      '부여로 떠나는 다함께 시골투어 - 충남 부여 여행 이미지',
    );
    expect(travelImage).toHaveAttribute('src', '');
  });

  it('여행 이름이 없을 경우, 렌더링하지 않습니다', () => {
    renderTravelCard({ travelName: '' });
    const travelName = screen.queryByText(mock.travelName);
    expect(travelName).not.toBeInTheDocument();
  });

  it('여행 위치가 없을 경우, 렌더링하지 않습니다', () => {
    renderTravelCard({ location: '' });
    const travelLocation = screen.queryByText(mock.location);
    expect(travelLocation).not.toBeInTheDocument();
  });

  it('여행 날짜가 없을 경우, 렌더링하지 않습니다', () => {
    renderTravelCard({ formattedStartDate: '' });
    const travelDate = screen.queryByText(mock.formattedStartDate);
    expect(travelDate).not.toBeInTheDocument();
  });

  it('참가자 정보가 없을 경우, 참가자 정보가 렌더링되지 않습니다', () => {
    renderTravelCard({ currentTravelMateCount: undefined });
    expect(screen.queryByText('0/6')).not.toBeInTheDocument();
  });
});
