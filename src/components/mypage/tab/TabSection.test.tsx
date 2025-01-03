import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TabSection from './TabSection';

describe('TabSection 컴포넌트', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it('MainTab과 SubTab, TabContents가 정상적으로 렌더링되어야 한다.', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TabSection />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('mainTab')).toBeInTheDocument();
    expect(screen.getByTestId('myTravelSubTab')).toBeInTheDocument();

    // 데이터 로딩이 완료될 때까지 기다림
    await waitFor(
      () => {
        expect(screen.getByTestId('upcomming-travels')).toBeInTheDocument();
      },
      {
        timeout: 5000,
        interval: 100,
      },
    );
  });
});
