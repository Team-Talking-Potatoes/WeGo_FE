import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TravelCard from './TravelCard';

const mock = {
  travelId: 12,
  isDomestic: true,
  travelName: '부여로 떠나는 다함께 시골투어',
  travelLocation: '충남 부여',
  maxTravelMateCount: 6,
  currentTravelMateCount: 1,
  startAt: '2001-12-03',
  endAt: '2001-12-20',
  formattedStartDate: '2001-12-03',
  travelImage: '/test/travel/test1.png',
  bookmarkFlag: false,
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
        travelLocation={props.travelLocation}
        maxTravelMateCount={props.maxTravelMateCount}
        currentTravelMateCount={props.currentTravelMateCount}
        startAt={props.startAt}
        endAt={props.endAt}
        formattedStartDate={props.formattedStartDate}
        travelImage={props.travelImage}
        bookmarkFlag={props.bookmarkFlag}
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
    expect(screen.getByText(/2001.12.03/)).toBeInTheDocument();
  });

  it('국내/해외 여행 라벨을 렌더링합니다', () => {
    expect(screen.getByText('국내여행')).toBeInTheDocument();
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
    renderTravelCard({ travelImage: '' });
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
    renderTravelCard({ travelLocation: '' });
    const travelLocation = screen.queryByText(mock.travelLocation);
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
