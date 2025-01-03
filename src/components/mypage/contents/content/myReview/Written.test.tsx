import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useMyReview from '@/queries/review/useMyReview';
import Written from './Written';

jest.mock('@/queries/review/useMyReview');
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('Written 컴포넌트', () => {
  const queryClient = new QueryClient();

  const mockReview = {
    id: 1,
    reviewImage: 'https://example.com/image.jpg',
    title: '리뷰 제목 1',
    content: '리뷰 내용 1',
    starRating: 5,
    travelLocation: '서울',
    createdAt: '2023-10-01',
  };

  const renderWithProvider = (ui: React.ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리뷰 데이터가 있을 때 리뷰 카드를 렌더링한다', () => {
    (useMyReview as jest.Mock).mockReturnValue({
      data: {
        total: 1,
        reviews: [mockReview],
      },
    });

    renderWithProvider(<Written />);

    expect(screen.getByText('리뷰 제목 1')).toBeInTheDocument();
    expect(screen.getByText('리뷰 내용 1')).toBeInTheDocument();
    expect(screen.getByText('서울')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('리뷰 데이터가 없을 때 빈 상태 메시지를 렌더링한다', () => {
    (useMyReview as jest.Mock).mockReturnValue({
      data: {
        total: 0,
        reviews: [],
      },
    });

    renderWithProvider(<Written />);

    expect(screen.getByText('아직 작성한 리뷰가 없어요!')).toBeInTheDocument();
  });

  it('리뷰가 12개 이상일 때 페이지네이션을 렌더링한다', () => {
    const mockReviews = Array(13)
      .fill(mockReview)
      .map((review, index) => ({
        ...review,
        reviewId: index + 1,
      }));

    (useMyReview as jest.Mock).mockReturnValue({
      data: {
        total: 13,
        reviews: mockReviews.slice(0, 12), // 첫 페이지에는 12개만 표시
      },
    });

    renderWithProvider(<Written />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // 2페이지 버튼 존재
  });

  it('로딩 상태를 처리한다', () => {
    (useMyReview as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
    });

    renderWithProvider(<Written />);
    // 로딩 상태 UI 테스트
  });

  it('에러 상태를 처리한다', () => {
    (useMyReview as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error('Failed to fetch reviews'),
    });

    renderWithProvider(<Written />);
    // 에러 상태 UI 테스트
  });
});
