import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HASH_TAGS } from '@/constants/hashTag';
import useCreateReviewStore from '@/store/useCreateReview';
import SelectHashTag from './SelectHashTag';

const mockUseCreateReviewStore = useCreateReviewStore as unknown as jest.Mock;

jest.mock('@/store/useCreateReview', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SelectHashTag', () => {
  let setHashTagsMock: jest.Mock;

  beforeEach(() => {
    setHashTagsMock = jest.fn();
    mockUseCreateReviewStore.mockImplementation(() => ({
      hashTags: new Set<string>(),
      setHashTags: setHashTagsMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('HASH_TAGS의 모든 해시 태그를 렌더링합니다', () => {
    render(<SelectHashTag />);

    Object.values(HASH_TAGS).forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('태그를 클릭하면 setHashTags를 호출합니다', () => {
    render(<SelectHashTag />);

    const tagButton = screen.getByText(Object.values(HASH_TAGS)[0]);
    fireEvent.click(tagButton);

    expect(setHashTagsMock).toHaveBeenCalledWith(Object.values(HASH_TAGS)[0]);
  });

  it('선택한 태그를 강조표시 합니다', () => {
    render(<SelectHashTag />);
    const selectedTag = screen.getByText(Object.values(HASH_TAGS)[0]);

    fireEvent.click(selectedTag);
    expect(selectedTag).toHaveClass(
      'bg-blue-50 text-primary-normal body-2-r rounded px-2 py-1',
    );
  });

  it('여러 태그 선택을 허용해야 합니다', () => {
    render(<SelectHashTag />);

    const firstTagButton = screen.getByText(Object.values(HASH_TAGS)[0]);
    const secondTagButton = screen.getByText(Object.values(HASH_TAGS)[1]);

    fireEvent.click(firstTagButton);
    fireEvent.click(secondTagButton);

    expect(setHashTagsMock).toHaveBeenCalledWith(Object.values(HASH_TAGS)[0]);
    expect(setHashTagsMock).toHaveBeenCalledWith(Object.values(HASH_TAGS)[1]);
  });
});
