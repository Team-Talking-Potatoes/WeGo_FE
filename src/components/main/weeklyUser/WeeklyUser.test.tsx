import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import userListData from '@/mocks/data/user/userList.json';
import WeeklyUser from './WeeklyUser';

const currentMonth = dayjs().month() + 1;

describe('WeeklyUser', () => {
  it('인기 여행 유저 제목과 소제목을 렌더링합니다', () => {
    render(<WeeklyUser userList={userListData} />);
    expect(
      screen.getByText(`${currentMonth}월의 여행지기`),
    ).toBeInTheDocument();
    expect(
      screen.getByText('이번 달 리뷰가 많은 여행지기들을 소개해 드려요!'),
    ).toBeInTheDocument();
  });

  it('데이터가 있으면 UserCard 컴포넌트를 렌더링합니다', async () => {
    render(<WeeklyUser userList={userListData} />);

    expect(screen.getByText('녹차라떼')).toBeInTheDocument();
    expect(screen.getByText('친절해요')).toBeInTheDocument();
  });

  it('데이터가 없으면 안내문구와 버튼 링크를 렌더링합니다', () => {
    render(<WeeklyUser userList={[]} />);

    expect(
      screen.getByText(
        '아직 여행지기들이 없어요.여행모임을 만들고 다양한 여행지기들과 함께해 볼까요?',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('여행모임 만들기')).toBeInTheDocument();
  });
});
