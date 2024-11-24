import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonTemplate from './ButtonTemplate';

describe('ButtonTemplate', () => {
  it('label이 올바르게 렌더링되는지 테스트', () => {
    render(<ButtonTemplate label="테스트 버튼" />);

    expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
  });

  it('children이 올바르게 렌더링되는지 테스트', () => {
    render(
      <ButtonTemplate>
        <span>자식 요소</span>
      </ButtonTemplate>,
    );

    expect(screen.getByText('자식 요소')).toBeInTheDocument();
  });

  it('클릭 이벤트가 정상적으로 동작하는지 테스트', () => {
    const mockHandler = jest.fn();
    render(<ButtonTemplate label="클릭 테스트" handler={mockHandler} />);

    fireEvent.click(screen.getByText('클릭 테스트'));

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('error가 true일 때 버튼이 비활성화되는지 테스트', () => {
    render(<ButtonTemplate label="에러 상태" error={true} />);

    expect(screen.getByText('에러 상태')).toBeDisabled();
  });

  it('variant와 size prop이 올바른 클래스를 적용하는지 테스트', () => {
    render(
      <ButtonTemplate label="스타일 테스트" variant="default" size="lg" />,
    );
    const button = screen.getByText('스타일 테스트');

    expect(button).toHaveClass(
      'rounded-md px-4 py-2 hover:bg-blue-600 bg-blue-500 text-white text-md',
    );
  });
});
