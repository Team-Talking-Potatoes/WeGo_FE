import { render, screen, fireEvent, act } from '@testing-library/react';
import useGetUser from '@/queries/user/useGetUser';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeHeader from './HomeHeader';

jest.mock('@/queries/user/useGetUser');

const queryClient = new QueryClient();

const renderHomeHeaderQueryClient = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <HomeHeader />
    </QueryClientProvider>,
  );
};

const mockUserInfo = {
  userId: 1,
  nickname: '닉네임',
  email: 'email',
  description: 'description',
  profileImage: 'https://example.com/image.jpg',
};

describe('HomeHeader', () => {
  it('로고를 렌더링합니다', () => {
    (useGetUser as jest.Mock).mockReturnValue({
      data: mockUserInfo,
    });
    renderHomeHeaderQueryClient();
    const logoLink = screen.getByLabelText('WEGO 로고');
    expect(logoLink).toBeInTheDocument();
  });

  it('로그인 되어있다면 마이페이지와 모임 만들기 아이콘을 렌더링합니다', () => {
    (useGetUser as jest.Mock).mockReturnValue({
      data: mockUserInfo,
    });
    renderHomeHeaderQueryClient();
    expect(screen.getByLabelText('모임 만들기')).toBeInTheDocument();
    expect(screen.getByLabelText('마이페이지로 가기')).toBeInTheDocument();
  });

  it('스크롤 위치에 따라 색상이 변경 된 아이콘을 표시합니다', () => {
    (useGetUser as jest.Mock).mockReturnValue({
      data: mockUserInfo,
    });
    renderHomeHeaderQueryClient();
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
      fireEvent.scroll(window);
    });

    expect(screen.getByText('여행리뷰')).toHaveClass('text-label-normal');
    expect(screen.getByText('여행찾기')).toHaveClass('text-label-normal');
  });
});

describe('HomeHeader, 로그인이 되어있지 않고', () => {
  it('user 데이터가 없는 경우, 로그인하기 아이콘을 렌더링합니다', () => {
    (useGetUser as jest.Mock).mockReturnValue({ data: null });
    render(<HomeHeader />);

    expect(screen.getByLabelText('로그인하기')).toBeInTheDocument();
  });
});
