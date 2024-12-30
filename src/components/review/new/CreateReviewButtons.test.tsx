import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useCreateReview } from '@/queries/review/useCreateReview';

import { create } from '@/mocks/zustand';
import CreateReviewButtons from './CreateReviewButtons';

type CreateReviewStore = {
  resetStore: jest.Mock;
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockResetStore = jest.fn();
const useCreateReviewStore = create<CreateReviewStore>(() => ({
  resetStore: mockResetStore,
}));

jest.mock('@/queries/review/useCreateReview', () => ({
  useCreateReview: jest.fn(() => ({
    handleSubmit: jest.fn(),
  })),
}));

describe('CreateReviewButtons', () => {
  const mockRouter = { back: jest.fn() };
  const mockClickNext = jest.fn();

  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useCreateReview as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
    });
    jest.clearAllMocks();
    act(() => {
      useCreateReviewStore.setState({ resetStore: mockResetStore });
    });
  });

  it('리뷰 생성 페이지에서 첫 페이지일 경우 "다음" 버튼을 렌더링합니다', () => {
    render(<CreateReviewButtons isFirstPage clickNext={mockClickNext} />);

    expect(screen.getByText('취소')).toBeInTheDocument();
    expect(screen.getByText('다음')).toBeInTheDocument();
  });

  it('리뷰 생성 페이지에서 첫 페이지가 아닐 경우 "확인" 버튼을 렌더링합니다', () => {
    render(
      <CreateReviewButtons isFirstPage={false} clickNext={mockClickNext} />,
    );

    expect(screen.getByText('취소')).toBeInTheDocument();
    expect(screen.getByText('확인')).toBeInTheDocument();
  });

  it('취소 버튼을 클릭하면 resetStore가 호출되고, router.back이 호출됩니다', () => {
    render(<CreateReviewButtons isFirstPage clickNext={mockClickNext} />);

    const cancelButton = screen.getByText('취소');
    fireEvent.click(cancelButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('다음 버튼을 클릭하면 clickNext가 호출됩니다', () => {
    render(<CreateReviewButtons isFirstPage clickNext={mockClickNext} />);

    const nextButton = screen.getByText('다음');
    fireEvent.click(nextButton);

    expect(mockClickNext).toHaveBeenCalledTimes(1);
  });

  it('확인 버튼을 클릭하면 handleSubmit이 호출됩니다', () => {
    render(
      <CreateReviewButtons isFirstPage={false} clickNext={mockClickNext} />,
    );

    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
