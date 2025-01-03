import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MainReviewCard from './MainReviewCard';

const mockReview = {
  reviewId: 123,
  nickname: 'testuser',
  reviewImage: 'https://example.com/image.jpg',
};

const renderComponent = (overrides = {}) => {
  const props = {
    ...mockReview,
    ...overrides,
  };
  render(
    <MainReviewCard
      reviewId={props.reviewId}
      nickname={props.nickname}
      reviewImage={props.reviewImage}
    />,
  );
};

describe('ReviewCard', () => {
  it('리뷰 이미지를 렌더링합니다', () => {
    renderComponent();

    const image = screen.getByAltText(
      `${mockReview.nickname}의 여행 후기 사진`,
    );
    expect(image).toBeInTheDocument();
  });

  it('리뷰 닉네임을 렌더링합니다', () => {
    renderComponent();
    const nicknameText = screen.getByText(`${mockReview.nickname}`);
    expect(nicknameText).toBeInTheDocument();
  });

  it('닉네임이 없을 경우 닉네임 텍스트가 렌더링되지 않습니다', () => {
    renderComponent({ nickname: undefined });
    const nicknameText = screen.queryByText(`${mockReview.nickname}`);
    expect(nicknameText).not.toBeInTheDocument();
  });

  it('리뷰 링크를 렌더링합니다', () => {
    renderComponent();
    const reviewLink = screen.getByRole('link', {
      name: `${mockReview.nickname}의 여행 후기 사진`,
    });
    expect(reviewLink).toHaveAttribute(
      'href',
      `/review/${mockReview.reviewId}`,
    );
  });
});
