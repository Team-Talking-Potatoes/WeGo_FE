import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import useEditProfile from '@/queries/user/useEditProfile';
import useGetUser from '@/queries/user/useGetUser';
import EditForm from './EditForm';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} alt={props.alt} />;
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/queries/user/useEditProfile', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/queries/user/useGetUser', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('EditForm', () => {
  const mockRouter = {
    back: jest.fn(),
  };
  const mockEditProfile = jest.fn();
  const mockUser = {
    profileImage: 'https://example.com/test-image.jpg',
    nickname: '테스트유저',
    introduction: '테스트 소개',
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useEditProfile as jest.Mock).mockReturnValue({
      mutate: mockEditProfile,
    });
    (useGetUser as jest.Mock).mockReturnValue({
      data: mockUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('폼이 올바르게 렌더링되어야 한다', () => {
    render(<EditForm />);
    expect(screen.getByText('프로필 수정')).toBeInTheDocument();
    expect(screen.getByText('닉네임')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
    expect(screen.getByText('저장')).toBeInTheDocument();
  });

  it('취소 버튼 클릭 시 이전 페이지로 이동해야 한다', () => {
    render(<EditForm />);
    fireEvent.click(screen.getByText('취소'));
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it('아무 입력이 없을 때 저장 버튼이 비활성화되어야 한다', () => {
    render(<EditForm />);
    const saveButton = screen.getByText('저장');
    expect(saveButton).toBeDisabled();
  });

  it('폼 제출 시 editProfile이 호출되어야 한다', () => {
    render(<EditForm />);

    const nicknameInput =
      screen.getByPlaceholderText('닉네임을 입력해 주세요.');
    fireEvent.change(nicknameInput, { target: { value: '새닉네임' } });

    const form = screen.getByRole('form', { name: '프로필 수정 폼' });
    fireEvent.submit(form);

    expect(mockEditProfile).toHaveBeenCalled();
  });

  it('이미지 업로드 시 미리보기가 표시되어야 한다', () => {
    const mockUrl = 'blob:test';
    global.URL.createObjectURL = jest.fn(() => mockUrl);

    render(<EditForm />);
    const fileInput = screen.getByLabelText('이미지 업로드');

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
  });
});
