import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

const mock = {
  userId: 1,
  nickName: '녹차라떼',
  profileImage: '/test.png',
  reviewCount: 25,
  openTravelCount: 11,
  hashTags: '#상세해요#여행#맛집',
};

const renderUserCard = (overrides = {}) => {
  const props = {
    ...mock,
    ...overrides,
  };
  render(
    <UserCard
      userId={props.userId}
      nickName={props.nickName}
      profileImage={props.profileImage}
      openTravelCount={props.openTravelCount}
      reviewCount={props.reviewCount}
      hashTags={props.hashTags}
    />,
  );
};

describe('UserCard가 올바르게 렌더링됩니다', () => {
  beforeEach(() => renderUserCard());

  it('사용자 닉네임을 렌더링합니다', async () => {
    expect(screen.getByText('녹차라떼')).toBeInTheDocument();
  });

  it('프로필 이미지를 렌더링합니다', async () => {
    const profileImage = await screen.findByAltText('녹차라떼의 프로필 이미지');
    expect(profileImage).toBeInTheDocument();
  });

  it('해시태그를 렌더링합니다', async () => {
    expect(screen.getByText('상세해요')).toBeInTheDocument();
    expect(screen.getByText('여행')).toBeInTheDocument();
    expect(screen.getByText('맛집')).toBeInTheDocument();
  });

  it('openTravelCount와 reviewCount를 렌더링합니다', async () => {
    expect(screen.getByText('모임장 11회 • 리뷰 25개')).toBeInTheDocument();
  });

  it('유저 링크를 렌더링합니다', async () => {
    const link = screen.getByRole('link', { name: '녹차라떼 프로필 보기' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/1');
  });
});

describe('UserCard가 올바르게 렌더링되지 않습니다', () => {
  it('profileImage가 없을 경우 이미지를 렌더링하지 않습니다', () => {
    renderUserCard({ profileImage: '' });
    const Image = screen.queryByAltText(`${mock.profileImage}의 프로필 이미지`);
    expect(Image).not.toBeInTheDocument();
  });
  it('hashTags가 없을 경우 아무것도 렌더링하지 않습니다', () => {
    renderUserCard({ hashTags: '' });
    expect(screen.queryByText('상세해요')).toBeNull();
  });
});
