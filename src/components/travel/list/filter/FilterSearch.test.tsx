import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import FilterSearch from './FilterSearch';

const mockSetFilters = jest.fn();

jest.mock('@/store/useTravelListStore', () => ({
  useTravelListStore: () => ({
    filters: {
      searchText: '',
    },
    setFilters: mockSetFilters,
  }),
}));

describe('FilterSearch', () => {
  const placeholderText = '숙소/여행지/맛집 등을 입력해 주세요.';
  const searchText = '서울';

  it('입력 필드에 텍스트를 입력할 수 있습니다', () => {
    render(<FilterSearch />);

    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: searchText } });

    expect(input).toHaveValue(searchText);
  });
});
