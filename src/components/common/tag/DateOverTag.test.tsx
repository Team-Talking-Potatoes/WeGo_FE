import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import DateOverTag from './DateOverTag';

describe('DateOverTag', () => {
  it('endAt이 오늘을 지나면 마감 태그를 렌더링합니다', () => {
    const pastDate = dayjs().subtract(1, 'day').format('YYYY.MM.DD');
    render(<DateOverTag endAt={pastDate} />);
    expect(screen.getByText('마감')).toBeInTheDocument();
  });

  it('오늘마감 태그를 렌더링합니다', () => {
    const today = dayjs().format('YYYY.MM.DD');
    render(<DateOverTag endAt={today} />);
    const tagElement = screen.getByText('오늘 마감');
    expect(tagElement).toBeInTheDocument();
  });

  it('endAt이 오늘을 지나지 않으면 null을 반환합니다', () => {
    const futureDate = dayjs().add(1, 'day').format('YYYY.MM.DD');
    render(<DateOverTag endAt={futureDate} />);
    const tagElement = screen.queryByText('오늘 마감');
    expect(tagElement).not.toBeInTheDocument();

    const tagElement2 = screen.queryByText('마감');
    expect(tagElement2).not.toBeInTheDocument();
  });
});
