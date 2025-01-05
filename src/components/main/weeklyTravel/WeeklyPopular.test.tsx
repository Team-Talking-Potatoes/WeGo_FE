import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import travelListData from '@/mocks/data/travel/travelList.json';
import dayjs from 'dayjs';
import { getWeekNumber } from '@/utils/dateChangeKr';
import WeeklyPopular from './WeeklyPopular';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn().mockReturnValue({
    mutate: jest.fn(),
    onError: jest.fn(),
  }),
  useQueryClient: jest.fn(),
}));

describe('WeeklyPopular', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('인기 여행 리스트 제목과 소제목을 렌더링합니다', () => {
    const month = dayjs().month() + 1;
    const week = getWeekNumber();
    render(<WeeklyPopular travelList={travelListData} />);
    expect(screen.getByText('이번주 인기 여행모임')).toBeInTheDocument();
    expect(
      screen.getByText(
        `${month}월 ${week}주차 조회수가 가장 많은 여행 모임을 알려드려요!`,
      ),
    ).toBeInTheDocument();
  });

  it('데이터가 있으면 TravelCardBig 컴포넌트를 렌더링합니다', () => {
    render(<WeeklyPopular travelList={travelListData} />);
    expect(
      screen.getByText('부여로 떠나는 다함께 시골투어'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('지하철로 떠나는 일본 도심 투어'),
    ).toBeInTheDocument();
  });

  it('데이터가 없으면 안내 문구와 링크 버튼을 렌더링합니다', () => {
    render(<WeeklyPopular travelList={[]} />);
    expect(
      screen.getByText(
        '아직 여행모임이 없어요.나의 취향을 담은 여행 모임을 한번 만들어 보세요!',
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('첫 여행모임 만들기')).toBeInTheDocument();
  });
});
