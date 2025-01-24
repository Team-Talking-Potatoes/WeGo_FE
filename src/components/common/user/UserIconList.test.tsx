import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UserIconList from './UserIconList';

const mock = {
  participant: [
    {
      userId: 1,
      nickname: '이름',
      role: 'role',
      profileImage: 'https://example.com/image.jpg',
    },
  ],
};

const mockList = {
  participant: [
    {
      userId: 1,
      nickname: '이름',
      role: 'role',
      profileImage: 'https://example.com/image.jpg',
    },
    {
      userId: 2,
      nickname: '이름',
      role: 'role',
      profileImage: 'https://example.com/image.jpg',
    },
    {
      userId: 3,
      nickname: '이름',
      role: 'role',
      profileImage: 'https://example.com/image.jpg',
    },
    {
      userId: 4,
      nickname: '4번',
      role: 'role',
      profileImage: 'https://example.com/image.jpg',
    },
    {
      userId: 5,
      nickname: '마지막',
      role: 'role',
      profileImage: 'https://example.com/image.jpg',
    },
  ],
};

describe('UserIconList', () => {
  it('유저 프로필 이미지 리스트를 렌더링합니다', () => {
    render(<UserIconList participant={mock.participant} />);
    expect(screen.getByAltText('이름의 프로필 이미지')).toBeInTheDocument();
  });

  it('유저 리스트 길이가 5이상일 때 아이콘 4개와 "+숫자"로 표시됩니다', () => {
    render(<UserIconList participant={mockList.participant} />);
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.getByAltText('4번의 프로필 이미지')).toBeInTheDocument();
    expect(
      screen.queryByAltText('마지막의 프로필 이미지'),
    ).not.toBeInTheDocument();
  });

  it('유저 리스트 길이가 5미만일 때 "+숫자" 없이 렌더링합니다', () => {
    render(<UserIconList participant={mock.participant} />);
    expect(screen.queryByText('+1')).not.toBeInTheDocument();
  });
});
