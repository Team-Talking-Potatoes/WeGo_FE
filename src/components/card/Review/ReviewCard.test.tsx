import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import ReviewCard from './ReviewCard';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    // 필요한 다른 router 메서드들...
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('리뷰 카드 컴포넌트', () => {
  const props = {
    reviewId: 1,
    profileImage: '/user.jpg',
    image: '/test.png',
    title: '테스트 리뷰',
    content: '이것은 테스트 리뷰 내용입니다.',
    score: 4.5,
    travelLocation: '서울',
    createdAt: '2023-10-10',
    isLiked: false,
  };

  it('리뷰 카드가 올바르게 렌더링되어야 합니다 (리뷰 페이지)', () => {
    renderWithQueryClient(<ReviewCard {...props} nickname="테스터" />);

    expect(screen.getByText('테스트 리뷰')).toBeInTheDocument();
    expect(
      screen.getByText('이것은 테스트 리뷰 내용입니다.'),
    ).toBeInTheDocument();
    expect(screen.getByText('테스터')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('리뷰 카드가 올바르게 렌더링되어야 합니다 (마이페이지)', () => {
    renderWithQueryClient(<ReviewCard {...props} />);

    expect(screen.getByText('테스트 리뷰')).toBeInTheDocument();
    expect(
      screen.getByText('이것은 테스트 리뷰 내용입니다.'),
    ).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('서울')).toBeInTheDocument();
  });

  it('이미지가 올바르게 표시되어야 합니다', () => {
    renderWithQueryClient(<ReviewCard {...props} />);

    const image = screen.getByAltText('테스트 리뷰');
    expect(image).toBeInTheDocument();
  });
});
