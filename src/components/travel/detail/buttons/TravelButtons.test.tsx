import '@testing-library/jest-dom';
import useModal from '@/hooks/useModal';
import useDeleteTravel from '@/queries/travel/useDeleteTravel';
import { useRouter } from 'next/navigation';
import useGetUser from '@/queries/user/useGetUser';
import {
  useTravelParticipation,
  useTravelParticipationCancel,
} from '@/queries/travel/useTravelParticipation';
import { render, screen } from '@testing-library/react';
import TravelButtons from './TravelButtons';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/queries/travel/useTravelParticipation', () => ({
  useTravelParticipation: jest.fn(),
  useTravelParticipationCancel: jest.fn(),
}));

jest.mock('@/queries/travel/useDeleteTravel');
jest.mock('@/hooks/useModal');
jest.mock('@/queries/user/useGetUser');

describe('TravelButtons', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useModal as jest.Mock).mockReturnValue({
      showModal: jest.fn(),
      closeModal: jest.fn(),
    });
    (useGetUser as jest.Mock).mockReturnValue({
      data: {
        userId: 1,
        nickname: '닉네임',
        email: 'email',
        description: 'description',
        profileImage: 'https://example.com/image.jpg',
      },
    });
    (useTravelParticipation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
    (useTravelParticipationCancel as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
    (useDeleteTravel as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
  });

  it('주최자인 경우 "여행취소"와 "공유" 버튼이 렌더링됩니다', () => {
    render(<TravelButtons travelId={101} participationFlag organizer={1} />);
    expect(screen.getByText('여행취소')).toBeInTheDocument();
    expect(screen.getByText('공유')).toBeInTheDocument();

    expect(screen.queryByText('동행취소')).not.toBeInTheDocument();
    expect(screen.queryByText('동행')).not.toBeInTheDocument();
  });

  it('참여자일 경우 "동행취소" 버튼이 렌더링됩니다', () => {
    render(<TravelButtons travelId={1} participationFlag organizer={5} />);
    expect(screen.getByText('동행취소')).toBeInTheDocument();

    expect(screen.queryByText('여행취소')).not.toBeInTheDocument();
    expect(screen.queryByText('공유')).not.toBeInTheDocument();
    expect(screen.queryByText('동행')).not.toBeInTheDocument();
  });

  it('참여하지 않은 사용자일 경우 "동행" 버튼이 렌더링됩니다', () => {
    render(
      <TravelButtons travelId={1} participationFlag={false} organizer={5} />,
    );
    expect(screen.getByText('동행')).toBeInTheDocument();

    expect(screen.queryByText('여행취소')).not.toBeInTheDocument();
    expect(screen.queryByText('공유')).not.toBeInTheDocument();
    expect(screen.queryByText('동행취소')).not.toBeInTheDocument();
  });
});
