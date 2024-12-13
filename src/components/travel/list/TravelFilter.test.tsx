import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TravelFilter from './TravelFilter';

describe('TravelFilter', () => {
  it('필터 버튼을 렌더링 한다', async () => {
    render(<TravelFilter />);

    const location = await screen.findByRole('button', { name: '지역전체' });
    expect(location).toBeInTheDocument();
    const date = await screen.findByRole('button', { name: '' });
    expect(date).toBeInTheDocument();
    expect(await screen.findByText('날짜전체')).toBeInTheDocument();

    expect(
      await screen.findByLabelText('여행 리스트 정렬 버튼'),
    ).toBeInTheDocument();
  });

  it('검색창을 렌더링 한다', async () => {
    render(<TravelFilter />);
    expect(
      await screen.findByLabelText('숙소/여행지/맛집 등 검색'),
    ).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(
        '숙소/여행지/맛집 등을 입력해 주세요.',
      ),
    ).toBeInTheDocument();
  });
});
