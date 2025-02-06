import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import useGetUser from '@/queries/user/useGetUser';
import {
  useBookmarkTravel,
  useDeleteBookmarkTravel,
} from '@/queries/travel/useBookmarkTravel';
import TabTravelDetail from './TabTravelDetail';

jest.mock('@/queries/travel/useBookmarkTravel');
jest.mock('@/queries/user/useGetUser');

const mockUserInfo = {
  userId: 1,
  nickname: '닉네임',
  email: 'email',
  description: 'description',
  profileImage: '/image.jpg',
};

const mock = {
  travelId: 1,
  participationFlag: true,
  organizer: {
    userId: 1,
    nickname: '녹차라떼',
    role: 'string',
    profileImage: '/image.jpg',
  },
  hashTags: '#겨울여행#액티비티',
  description:
    '12월의 겨울 낭만을 즐기고 싶은 분들 계신가요?함께 국내 겨울 여행지를 돌아다니고 싶습니다!춥지만, 마음만은 따듯한 겨울 여행 함께해요 :)다양한 사람들이 모여서 함께 하고 싶어요!',
};

describe('TabTravelDetail', () => {
  beforeEach(() => {
    (useGetUser as jest.Mock).mockReturnValue({
      data: mockUserInfo,
    });
    (useBookmarkTravel as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    (useDeleteBookmarkTravel as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });

    render(
      <TabTravelDetail
        travelId={mock.travelId}
        participationFlag={mock.participationFlag}
        organizer={mock.organizer}
        hashTags={mock.hashTags}
        description={mock.description}
        bookmarkFlag
      />,
    );
  });

  it('여행 상세 작성자, 해시태그, 설명이 렌더링됩니다', () => {
    expect(screen.getByText('녹차라떼')).toBeInTheDocument();
    expect(screen.getByText('# 겨울여행')).toBeInTheDocument();
    expect(screen.getByText('# 액티비티')).toBeInTheDocument();
    expect(
      screen.getByText(
        '12월의 겨울 낭만을 즐기고 싶은 분들 계신가요?함께 국내 겨울 여행지를 돌아다니고 싶습니다!춥지만, 마음만은 따듯한 겨울 여행 함께해요 :)다양한 사람들이 모여서 함께 하고 싶어요!',
      ),
    ).toBeInTheDocument();
  });
});

describe('여행 모임장일 때', () => {
  beforeEach(() => {
    (useGetUser as jest.Mock).mockReturnValue({
      data: mockUserInfo,
    });
    (useBookmarkTravel as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    (useDeleteBookmarkTravel as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });

    render(
      <TabTravelDetail
        travelId={mock.travelId}
        participationFlag={mock.participationFlag}
        organizer={mock.organizer}
        hashTags={mock.hashTags}
        description={mock.description}
        bookmarkFlag={null}
      />,
    );
  });

  it('북마크는 렌더링되지 않습니다', () => {
    expect(screen.queryByText('북마크')).not.toBeInTheDocument();
  });

  it('채팅방 버튼이 렌더링됩니다', () => {
    expect(screen.getByText('채팅방')).toBeInTheDocument();
  });

  it('일정수정 버튼이 렌더링됩니다', () => {
    expect(screen.getByText('일정수정')).toBeInTheDocument();
  });
});

describe('여행 모임장이 아닐 때', () => {
  const mockParticipation = {
    travelId: 1,
    participationFlag: true,
    organizer: {
      userId: 2,
      nickname: '녹차라떼',
      role: 'string',
      profileImage: '/string.png',
    },
    hashTags: '#겨울여행#액티비티',
    description:
      '12월의 겨울 낭만을 즐기고 싶은 분들 계신가요?함께 국내 겨울 여행지를 돌아다니고 싶습니다!춥지만, 마음만은 따듯한 겨울 여행 함께해요 :)다양한 사람들이 모여서 함께 하고 싶어요!',
  };

  beforeEach(() => {
    (useGetUser as jest.Mock).mockReturnValue({
      data: mockUserInfo,
    });
    (useBookmarkTravel as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    (useDeleteBookmarkTravel as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });

    render(
      <TabTravelDetail
        travelId={mockParticipation.travelId}
        participationFlag={mockParticipation.participationFlag}
        organizer={mockParticipation.organizer}
        hashTags={mockParticipation.hashTags}
        description={mockParticipation.description}
        bookmarkFlag
      />,
    );
  });

  it('북마크를 렌더링합니다', () => {
    expect(screen.getByLabelText('북마크')).toBeInTheDocument();
  });

  it('채팅방을 렌더링합니다', () => {
    expect(screen.getByText('채팅방')).toBeInTheDocument();
  });

  it('일정수정을 렌더링하지 않습니다', () => {
    expect(screen.queryByText('일정수정')).not.toBeInTheDocument();
  });
});
