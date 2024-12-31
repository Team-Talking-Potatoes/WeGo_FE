import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import reviewListData from '@/mocks/data/review/reviewListMock.json';
import WeeklyReview from './WeeklyReview';

describe('WeeklyReview', () => {
  it('인기 리뷰 리스트의 제목과 소제목을 렌더링합니다', () => {
    render(<WeeklyReview reviewList={reviewListData} />);
    expect(
      screen.getByText('다양한 여행모임 후기들을 한눈에 확인해요!'),
    ).toBeInTheDocument();
    expect(screen.getByText('여행리뷰 모아보기')).toBeInTheDocument();
  });

  it('데이터가 없으면 여행참여 텍스트와 버튼, 링크를 렌더링합니다', () => {
    render(<WeeklyReview reviewList={[]} />);
    expect(
      screen.getByText('여행에 참여하고 후기를 남겨보세요!'),
    ).toBeInTheDocument();
    expect(screen.getByText('여행모임 보러가기')).toBeInTheDocument();
    const slides = screen.getAllByRole('link');
    expect(slides.length).toBe(1);
  });

  it('데이터가 있으면 리뷰 링크와 유저 프로필 링크를 렌더링합니다', () => {
    render(<WeeklyReview reviewList={reviewListData} />);

    const slides = screen.getAllByRole('link');
    expect(slides.length).toBe(13);
  });

  it('더 많은 리뷰 보기를 렌더링합니다', () => {
    render(<WeeklyReview reviewList={reviewListData} />);
    expect(screen.getByLabelText('더 많은 리뷰 보기')).toBeInTheDocument();
  });

  it('aria-label이 올바르게 렌더링되었는지 확인합니다', () => {
    render(<WeeklyReview reviewList={reviewListData} />);

    expect(screen.getByLabelText('이미지 가로 슬라이드')).toBeInTheDocument();

    const moreReviewsLink = screen.getByLabelText('더 많은 리뷰 보기');
    expect(moreReviewsLink).toBeInTheDocument();
  });
});
