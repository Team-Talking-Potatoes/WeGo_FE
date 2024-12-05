// describe('TravelCard component', () => {
//   it('should render correctly', () => {
//     expect(true).toBe(true);
//   });
// });

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { server } from '@/mocks/server';
// import { Suspense } from 'react';
import travelList from '@/mocks/travel/travelList.json';
import { http, HttpResponse } from 'msw';
import WeeklyPopularContainer from './WeeklyPopularContainer';

describe('WeeklyPopularContainer', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('api 요청 test', async () => {
    server.use(
      http.get('/api/travles/popular', () => {
        return HttpResponse.json(travelList);
      }),
    );
    const { container } = render(await WeeklyPopularContainer());
    // render(
    //   <Suspense fallback={<div>Loading...</div>}>
    //     <WeeklyPopularContainer />
    //   </Suspense>,
    // );
    expect(container.querySelector('section')).toBeInTheDocument();
    // expect(screen.getByText('travel popular')).toBeInTheDocument();
    // await waitFor(() => {
    // });
  });
});
