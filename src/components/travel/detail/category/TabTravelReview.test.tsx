import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import travelReviewData from '@/mocks/data/review/travelReviewList.json';
import TabTravelReview from './TabTravelReview';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));
jest.mock('@/api/review/review');
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('TabTravelReview', () => {
  const mockTravelId = 1;
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
    (useQuery as jest.Mock).mockReturnValue({
      data: travelReviewData,
      isLoading: true,
      isFetching: false,
      error: null,
    });
    render(<TabTravelReview travelId={mockTravelId} />);
  });

  it('로딩 중일 때 로딩 메시지를 표시합니다', () => {
    expect(screen.getByText('로딩중')).toBeInTheDocument();
  });

  it('리뷰 작성자를 렌더링합니다', () => {
    expect(screen.getByText('여행지기')).toBeInTheDocument();
  });

  it('리뷰 내용을 렌더링합니다', () => {
    expect(
      screen.getByText(
        '정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다.',
      ),
    ).toBeInTheDocument();
  });

  it('리뷰 점수를 렌더링합니다', () => {
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('리뷰 이미지를 렌더링합니다', async () => {
    const imageElement =
      await screen.findByAltText('여행지기의 여행리뷰 이미지');
    expect(imageElement).toBeInTheDocument();
  });
});
