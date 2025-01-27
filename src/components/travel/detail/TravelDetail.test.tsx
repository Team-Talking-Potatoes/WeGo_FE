import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import travelDetailData from '@/mocks/data/travel/travelDetail.json';
import TravelDetail from './TravelDetail';
import '@testing-library/jest-dom';

const travelDetailMock = travelDetailData;

const userInfoMock = {
  userId: 1,
  email: 'user@test.com',
  nickname: 'TestUser',
  profileImage: null,
  description: null,
};

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  queryClient.setQueryData(['user'], userInfoMock);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('TravelDetail', () => {
  it('여행 제목과 내용을 렌더링합니다', async () => {
    render(<TravelDetail travelDetail={travelDetailMock} />, { wrapper });

    expect(screen.getByText('12월에 떠나는 겨울여행')).toBeInTheDocument();

    expect(
      screen.getByText(
        '12월의 겨울 낭만을 즐기고 싶은 분들 계신가요?함께 국내 겨울 여행지를 돌아다니고 싶습니다!춥지만, 마음만은 따듯한 겨울 여행 함께해요 :)다양한 사람들이 모여서 함께 하고 싶어요!',
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('여행상세')).toBeInTheDocument();
    expect(screen.getByText('# 겨울여행')).toBeInTheDocument();

    expect(
      screen.getByAltText('12월에 떠나는 겨울여행 이미지'),
    ).toBeInTheDocument();
  });
});
