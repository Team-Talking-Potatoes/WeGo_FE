import { render, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import WeeklyUser from '@/components/main/weeklyUser/WeeklyUser'; // 경로 수정 필요
import '@testing-library/jest-dom';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@/api/user/userList', () => ({
  getPopularUser: jest.fn(),
}));

const currentMonth = new Date().getMonth() + 1;

describe('WeeklyUser', () => {
  it('로딩 중일 때 "로딩중 WeeklyUser"를 표시합니다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: false,
      error: null,
    });

    render(<WeeklyUser />);

    expect(screen.getByText('로딩중 WeeklyUser')).toBeInTheDocument();
  });

  it('데이터가 있으면 UserCard 컴포넌트를 렌더링합니다', async () => {
    const mockUserList = [
      {
        userId: 1,
        nickname: 'User 1',
        profileImage: '/profile1.jpg',
        openTravelCount: 5,
        reviewCount: 10,
        hashTags: '#explore',
      },
      {
        userId: 2,
        nickname: 'User 2',
        profileImage: '/profile2.jpg',
        openTravelCount: 3,
        reviewCount: 8,
        hashTags: '#explore',
      },
    ];

    (useQuery as jest.Mock).mockReturnValue({
      data: mockUserList,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(<WeeklyUser />);

    await waitFor(() => {
      expect(
        screen.getByText(`${currentMonth}월의 여행지기`),
      ).toBeInTheDocument();
      expect(
        screen.getByText('이번 달 리뷰가 많은 여행지기들을 소개해 드려요!'),
      ).toBeInTheDocument();

      mockUserList.forEach((user) => {
        expect(screen.getByText(user.nickname)).toBeInTheDocument();
      });
    });
  });

  it('에러가 발생하면 오류 메시지를 표시합니다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      error: { message: '네트워크 오류' },
    });

    render(<WeeklyUser />);

    expect(
      screen.getByText(
        '데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('네트워크 오류')).toBeInTheDocument();
  });
});
