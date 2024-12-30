import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TravelImage from './TravelImage';

jest.useFakeTimers().setSystemTime(new Date('2024-12-30'));

describe('TravelImage', () => {
  const mockProps = {
    image: '/path/to/image.jpg',
    name: '샘플 여행',
    endAt: '2024.12.31',
    registrationEnd: '2024.12.28',
  };

  afterAll(() => {
    jest.useRealTimers();
  });

  it('이미지가 렌더링됩니다', () => {
    render(<TravelImage {...mockProps} />);

    const image = screen.getByAltText('샘플 여행 이미지');
    expect(image).toBeInTheDocument();
  });

  it('등록 마감일을 지나지 않은 경우 DateOverTag를 렌더링하지 않습니다', () => {
    const futureProps = { ...mockProps, registrationEnd: '2025.01.01' };
    render(<TravelImage {...futureProps} />);

    const dateOverTag = screen.queryByText('마감');
    expect(dateOverTag).not.toBeInTheDocument();
  });
});
