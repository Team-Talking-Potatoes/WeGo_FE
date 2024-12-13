import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TravelHeader from './TravelHeader';

describe('TravelHeader', () => {
  it('More 버튼을 렌더링합니다', () => {
    render(<TravelHeader />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/travel/new');
    expect(screen.getByLabelText('여행 만들기 버튼')).toBeInTheDocument();

    expect(screen.getByText('여행 찾기')).toBeInTheDocument();
  });
});
