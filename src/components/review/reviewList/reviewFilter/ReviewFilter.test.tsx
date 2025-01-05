import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReviewStore } from '@/store/useReviewStore';
import ReviewFilter from './ReviewFilter';

jest.mock('@/store/useReviewStore');

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('ReviewFilter', () => {
  const setFiltersMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useReviewStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        filters: {
          sortOrder: 'LATEST',
        },
        setFilters: setFiltersMock,
      };
      return selector(state);
    });
  });

  it('기본적으로 "LATEST" 필터가 선택되어야 한다', () => {
    const { getByRole } = renderWithQueryClient(<ReviewFilter />);

    const latestButton = getByRole('button', { name: /최근/i });
    const popularButton = getByRole('button', { name: /인기/i });

    expect(latestButton).toBeDisabled();
    expect(popularButton).not.toBeDisabled();
  });

  it('필터 버튼 클릭 시 setFilters가 호출되어야 한다', () => {
    const { getByRole } = renderWithQueryClient(<ReviewFilter />);
    const popularButton = getByRole('button', { name: /인기/i });

    fireEvent.click(popularButton);

    expect(setFiltersMock).toHaveBeenCalledWith({
      sortOrder: 'POPULAR',
    });
  });

  it('필터 버튼 클릭 시 선택된 필터가 업데이트되어야 한다', () => {
    (useReviewStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        filters: {
          sortOrder: 'POPULAR',
        },
        setFilters: setFiltersMock,
      };
      return selector(state);
    });

    const { getByRole } = renderWithQueryClient(<ReviewFilter />);

    const popularButton = getByRole('button', { name: /인기/i });
    const latestButton = getByRole('button', { name: /최근/i });

    expect(popularButton).toBeDisabled();
    expect(latestButton).not.toBeDisabled();
  });
});
