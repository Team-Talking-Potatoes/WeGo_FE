import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SettingList from './SettingList';

// Next.js의 useRouter 모킹
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// useModal 모킹
jest.mock('@/hooks/useModal', () => ({
  __esModule: true,
  default: () => ({
    showModal: jest.fn(),
  }),
}));

// useLogout 모킹
jest.mock('@/queries/auth/useLogout', () => ({
  __esModule: true,
  default: () => ({
    mutate: jest.fn(),
  }),
}));

describe('SettingList', () => {
  it('모든 설정 항목이 올바르게 렌더링되어야 한다', () => {
    render(<SettingList />);

    expect(screen.getByText('문의하기')).toBeInTheDocument();
    expect(screen.getByText('궁금한 내용이 있으신가요?')).toBeInTheDocument();

    expect(screen.getByText('비밀번호 변경')).toBeInTheDocument();
    expect(
      screen.getByText('비밀번호를 변경하시고 싶으신가요?'),
    ).toBeInTheDocument();

    expect(screen.getByText('계정 탈퇴')).toBeInTheDocument();
    expect(
      screen.getByText("이제 WE'GO를 사용할 수 없어요."),
    ).toBeInTheDocument();

    expect(screen.getByText('로그아웃')).toBeInTheDocument();
    expect(screen.getByText('로그아웃 하시겠어요?')).toBeInTheDocument();
  });

  it('설정 목록이 올바른 스타일 클래스를 가져야 한다', () => {
    render(<SettingList />);

    const listContainer = screen.getByLabelText('설정 목록');
    expect(listContainer).toHaveClass('mx-auto w-full max-w-[688px]');
  });
});
