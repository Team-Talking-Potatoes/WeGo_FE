import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReviewHeart from './ReviewHeart';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    // 필요한 다른 router 메서드들...
  }),
}));

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('ReviewHeart 컴포넌트 테스트', () => {
  it('기본 렌더링이 올바른지 확인', () => {
    renderWithQueryClient(
      <ReviewHeart reviewId={1} isLiked={false} setIsLiked={() => {}} />,
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('heart-icon')).toHaveClass('fill-none');
  });

  it('isLiked이 true일 때 클래스가 올바른지 확인', () => {
    renderWithQueryClient(
      <ReviewHeart reviewId={1} isLiked setIsLiked={() => {}} />,
    );
    expect(screen.getByTestId('heart-icon')).toHaveClass('fill-primary-white');
  });
});
