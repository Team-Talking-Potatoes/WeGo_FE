import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TravelFilter from './TravelFilter';

describe('TravelFilter', () => {
  it('필터 버튼을 렌더링 한다', async () => {
    render(<TravelFilter />);

    const locationElements = await screen.findAllByText('지역전체');
    expect(locationElements.length).toBeGreaterThan(0);
    expect(locationElements[0]).toBeInTheDocument();

    expect(screen.getByText('날짜전체')).toBeInTheDocument();

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
