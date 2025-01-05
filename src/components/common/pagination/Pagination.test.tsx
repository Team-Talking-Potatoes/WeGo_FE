import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination 컴포넌트 테스트', () => {
  beforeAll(() => {
    // groupSize 계산을 위한 mock 엘리먼트 추가
    const div = document.createElement('div');
    div.className = 'md:block';
    document.body.appendChild(div);
  });

  it('페이지 번호 버튼이 올바르게 렌더링된다', () => {
    const paginateMock = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={4} currentPage={1} paginate={paginateMock} />,
    );

    // 실제 렌더링되는 페이지 수만큼 테스트
    for (let i = 1; i <= 4; i++) {
      expect(getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('현재 페이지 버튼은 올바른 스타일을 가진다', () => {
    const paginateMock = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={4} currentPage={3} paginate={paginateMock} />,
    );

    const currentPageButton = getByText('3');
    expect(currentPageButton).toHaveClass(
      'border-primary-normal bg-blue-100 text-primary-normal',
    );
  });

  it('페이지 버튼 클릭 시 paginate 함수가 호출된다', () => {
    const paginateMock = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={4} currentPage={1} paginate={paginateMock} />,
    );

    fireEvent.click(getByText('2'));
    expect(paginateMock).toHaveBeenCalledWith(2);
  });
});
