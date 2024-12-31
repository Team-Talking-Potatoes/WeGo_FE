import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecruitmentBox from './RecruitmentBox';

jest.mock('@/components/common/user/UserIconList', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked UserIconList</div>),
}));

jest.mock('@/components/common/progressbar/ProgressBar', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked ProgressBar</div>),
}));

describe('RecruitmentBox', () => {
  it('마감된 여행일 때 "마감된 여행입니다." 메시지를 렌더링합니다', () => {
    render(
      <RecruitmentBox
        isDateOver
        minTravelMateCount={2}
        maxTravelMateCount={5}
        participant={[]}
      />,
    );
    expect(screen.getByText('마감된 여행입니다.')).toBeInTheDocument();
    expect(screen.queryByText('모집 중')).not.toBeInTheDocument();
  });

  it('모집 중일 때 "모집 중" 메시지를 렌더링합니다', () => {
    render(
      <RecruitmentBox
        isDateOver={false}
        minTravelMateCount={2}
        maxTravelMateCount={5}
        participant={[]}
      />,
    );
    expect(screen.getByText('모집 중')).toBeInTheDocument();
    expect(screen.queryByText('마감된 여행입니다.')).not.toBeInTheDocument();
  });
});

describe('RecruitmentBox, 모집 중인 여행일 때', () => {
  const mockParticipants = [
    { id: 1, nickname: 'string', role: 'string', profileImage: 'string' },
    { id: 2, nickname: 'string', role: 'string', profileImage: 'string' },
  ];

  beforeEach(() =>
    render(
      <RecruitmentBox
        isDateOver={false}
        minTravelMateCount={2}
        maxTravelMateCount={5}
        participant={mockParticipants}
      />,
    ),
  );

  it('여행 정보가 렌더링됩니다', () => {
    expect(screen.getByText('모집 중')).toBeInTheDocument();
    expect(screen.getByText('최소인원')).toBeInTheDocument();
    expect(screen.getByText('최대인원')).toBeInTheDocument();
    expect(screen.getByText('2명')).toBeInTheDocument();
    expect(screen.getByText('5명')).toBeInTheDocument();
  });

  it('ProgressBar가 렌더링됩니다', () => {
    expect(screen.getByText('Mocked UserIconList')).toBeInTheDocument();
    expect(screen.getByText('Mocked ProgressBar')).toBeInTheDocument();
  });
});
