import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import useGetUser from '@/queries/user/useGetUser';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MobileHeader from './MobileHeader';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@/queries/user/useGetUser');

const queryClient = new QueryClient();

const renderMobileHeaderQueryClient = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MobileHeader />
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

const mockNullUserInfo = {
  userId: null,
  nickname: null,
  email: null,
  description: null,
  profileImage: null,
};

describe('MobileHeader', () => {
  it('로고를 렌더링합니다', () => {
    (usePathname as jest.Mock).mockReturnValue('/travel');
    (useGetUser as jest.Mock).mockReturnValue({
      data: mockUserInfo,
    });
    renderMobileHeaderQueryClient();
    const logoLink = screen.getByLabelText('WEGO 로고');
    expect(logoLink).toBeInTheDocument();
  });

  it('경로가 "/travel or /review"가 아닌경우 null을 반환합니다', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    (useGetUser as jest.Mock).mockReturnValue({
      data: mockUserInfo,
    });
    renderMobileHeaderQueryClient();

    expect(screen.queryByLabelText('WEGO 로고')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('모임 만들기')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('마이페이지로 가기'),
    ).not.toBeInTheDocument();
  });

  it('경로가 "/travel or /review"일 경우 로고를 렌더링합니다', () => {
    (usePathname as jest.Mock).mockReturnValue('/travel');
    render(<MobileHeader />);
    const logoLink = screen.getByLabelText('WEGO 로고');
    expect(logoLink).toBeInTheDocument();
  });

  it('경로가 "/travel or /review"이고, 로그인 되어있다면 마이페이지와 모임 만들기 아이콘을 렌더링합니다', () => {
    (usePathname as jest.Mock).mockReturnValue('/travel');
    (useGetUser as jest.Mock).mockReturnValue({
      data: mockUserInfo,
    });
    renderMobileHeaderQueryClient();
    expect(screen.getByLabelText('모임 만들기')).toBeInTheDocument();
    expect(screen.getByLabelText('마이페이지로 가기')).toBeInTheDocument();
  });
});

describe('MobileHeader, 로그인이 되어있지 않고', () => {
  it('user 데이터가 없는 경우, 로그인하기 아이콘을 렌더링합니다', () => {
    (useGetUser as jest.Mock).mockReturnValue({
      data: null,
    });
    renderMobileHeaderQueryClient();
    (usePathname as jest.Mock).mockReturnValue('/travel');
    (useGetUser as jest.Mock).mockReturnValue({ data: mockNullUserInfo });
    render(<MobileHeader />);

    expect(screen.getByLabelText('로그인하기')).toBeInTheDocument();
  });
});
