import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReviewHeart from './ReviewHeart';

describe('ReviewHeart 컴포넌트 테스트', () => {
  it('기본 렌더링이 올바른지 확인', () => {
    render(<ReviewHeart isLiked={false} animate={false} handler={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('heart-icon')).toHaveClass('fill-none');
  });

  it('isLiked이 true일 때 클래스가 올바른지 확인', () => {
    render(<ReviewHeart isLiked animate={false} handler={() => {}} />);
    expect(screen.getByTestId('heart-icon')).toHaveClass('fill-primary-white');
  });

  it('red prop이 true일 때 클래스가 올바른지 확인', () => {
    render(<ReviewHeart isLiked red animate={false} handler={() => {}} />);
    expect(screen.getByTestId('heart-icon')).toHaveClass('fill-red-400');
  });
});
