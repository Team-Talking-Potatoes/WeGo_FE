import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import WeeklyReview from './WeeklyReview';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

const mockReviewList = [
  {
    reviewId: 1,
    nickname: '테스트 유저 1',
    reviewImage: 'https://example.com/image1.jpg',
  },
  {
    reviewId: 2,
    nickname: '테스트 유저 2',
    reviewImage: 'https://example.com/image2.jpg',
  },
];

describe('WeeklyReview', () => {
  it('로딩 중일 때 로딩 메시지를 표시합니다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: false,
      error: null,
    });

    render(<WeeklyReview />);

    expect(screen.getByText('로딩중')).toBeInTheDocument();
  });

  it('데이터가 있으면 리뷰 카드와 "더 많은 리뷰 보기" 링크를 렌더링합니다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockReviewList,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(<WeeklyReview />);

    const slides = screen.getAllByRole('link');
    expect(slides.length).toBe(5);

    const moreReviewsLink = screen.getByLabelText('더 많은 리뷰 보기');
    expect(moreReviewsLink).toBeInTheDocument();
  });

  it('에러가 발생하면 에러 메시지를 표시합니다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
      error: { message: '네트워크 오류' },
    });

    render(<WeeklyReview />);

    expect(
      screen.getByText(
        '데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('네트워크 오류')).toBeInTheDocument();
  });

  it('aria-label이 올바르게 렌더링되었는지 확인합니다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockReviewList,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    render(<WeeklyReview />);

    expect(screen.getByLabelText('이미지 가로 슬라이드')).toBeInTheDocument();

    const moreReviewsLink = screen.getByLabelText('더 많은 리뷰 보기');
    expect(moreReviewsLink).toBeInTheDocument();
  });
});
