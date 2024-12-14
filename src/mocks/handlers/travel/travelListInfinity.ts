import { http, HttpResponse } from 'msw';
import travelData from '@/mocks/data/travel/travelListInfitity.json';

let currentPageState = 1;

const travelListInfinity = [
  http.get('/api/travels', async ({ request }) => {
    const url = new URL(request.url);
    const requestedPage = parseInt(url.searchParams.get('page') || '1', 10);

    if (requestedPage === currentPageState) {
      const pageSize = travelData.size;
      const response = {
        currentPage: currentPageState,
        size: travelData.size,
        isFirst: currentPageState === 1,
        isLast: currentPageState * pageSize >= travelData.travels.length,
        travels: travelData.travels,
      };
      currentPageState += 1;
      return HttpResponse.json(response);
    }

    return HttpResponse.error();
  }),
];

export default travelListInfinity;
