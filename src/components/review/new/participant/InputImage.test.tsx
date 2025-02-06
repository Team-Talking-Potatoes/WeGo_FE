import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import InputImage from './InputImage';

describe('InputImage', () => {
  it('이미지 등록버튼이 렌더링됩니다', async () => {
    render(<InputImage />);
    const fileInput = screen.getByLabelText(
      '이미지 등록하기, 이미지 하나당 5MB이내로 등록 가능 합니다',
    );
    expect(fileInput).toBeInTheDocument();
  });
});
