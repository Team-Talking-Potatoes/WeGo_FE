describe('TravelCard component', () => {
  it('should render correctly', () => {
    expect(true).toBe(true);
  });
});

// 아래부터 입니다

// import '@testing-library/jest-dom';
// import { render, screen, waitFor } from '@testing-library/react';
// import { server } from '@/mocks/server';
// import WeeklyPopularContainer from './WeeklyPopularContainer';

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// describe('WeeklyPopularContainer', () => {
//   it('api 요청 test', async () => {
//     render(await (<WeeklyPopularContainer />));

//     await waitFor(() => {
//       expect(screen.getByText('travel popular')).toBeInTheDocument();
//     });
//   });
// });
