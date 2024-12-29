import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import FilterDomestic from './FilterDomestic';

describe('FilterDomestic', () => {
  it('정렬 아이콘을 렌더링 합니다', async () => {
    render(<FilterDomestic />);

    const button = screen.getByLabelText('국내, 해외 선택 버튼');
    expect(button).toBeInTheDocument();
  });

  it('옵션 목록을 표시합니다', () => {
    render(<FilterDomestic />);
    const button = screen.getByLabelText('국내, 해외 선택 버튼');
    fireEvent.click(button);

    const latestOption = screen.getAllByText('지역전체');
    const popularOption = screen.getByText('국내');
    const registrationEndOption = screen.getByText('해외');

    expect(latestOption.length).toBeGreaterThan(0);
    expect(popularOption).toBeInTheDocument();
    expect(registrationEndOption).toBeInTheDocument();
  });

  it('기본값으로 "지역전체"가 표시됩니다', () => {
    render(<FilterDomestic />);
    const button = screen.getByLabelText('국내, 해외 선택 버튼');
    expect(button).toHaveTextContent('지역전체');
  });
});
