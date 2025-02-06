import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReviewCardAddText from './ReviewCardAddText';

const mockReveiwAndText = {
  nickname: '녹차',
  reviewImage: 'https://example.com/image.jpg',
  content: '맛있는 녹차',
  starRating: 5,
};

const renderReviewCard = (overrides = {}) => {
  const props = {
    ...mockReveiwAndText,
    ...overrides,
  };
  render(
    <ReviewCardAddText
      nickname={props.nickname}
      reviewImage={props.reviewImage}
      content={props.content}
      starRating={props.starRating}
    />,
  );
};

describe('ReviewCardAddText', () => {
  it('여행리뷰 이미지를 렌더링 합니다', () => {
    renderReviewCard();

    const image = screen.getByAltText(
      `${mockReveiwAndText.nickname}의 여행리뷰 이미지`,
    );
    expect(image).toBeInTheDocument();
  });

  it('여행리뷰 닉네임을 렌더링 합니다', () => {
    renderReviewCard();
    const nicknameText = screen.getByText(`${mockReveiwAndText.nickname}`);
    expect(nicknameText).toBeInTheDocument();
  });

  it('닉네임이 없을 경우 닉네임이 렌더링되지 않습니다', () => {
    renderReviewCard({ nickname: undefined });
    const nicknameText = screen.queryByText(`${mockReveiwAndText.nickname}`);
    expect(nicknameText).not.toBeInTheDocument();
  });

  it('여행리뷰 점수를 렌더링 합니다', () => {
    renderReviewCard();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('점수가 없을 경우 점수 텍스트가 렌더링되지 않습니다', () => {
    renderReviewCard({ starRating: undefined });
    const score = screen.queryByText('5');
    expect(score).not.toBeInTheDocument();
  });

  it('여행리뷰 내용을 렌더링 합니다', () => {
    renderReviewCard();
    expect(screen.getByText('맛있는 녹차')).toBeInTheDocument();
  });

  it('내용이 없을 경우 내용 텍스트가 렌더링되지 않습니다', () => {
    renderReviewCard({ content: undefined });
    const content = screen.queryByText('맛있는 녹차');
    expect(content).not.toBeInTheDocument();
  });
});
