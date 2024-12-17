import { http, HttpResponse } from 'msw';
import travelData from '@/mocks/data/travel/travelListInfitity.json';

const travelListInfinity = [
  http.get('/api/travels', async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const isDomestic = url.searchParams.get('isDomestic') === 'true';
    const startAt = url.searchParams.get('startAt');
    const endAt = url.searchParams.get('endAt');
    const sortOrder = url.searchParams.get('sortOrder');
    const query = url.searchParams.get('query');

    let filteredTravels = travelData.travels;

    if (isDomestic !== undefined) {
      filteredTravels = filteredTravels.filter(
        (travel) => travel.isDomestic === isDomestic,
      );
    }

    if (startAt) {
      filteredTravels = filteredTravels.filter(
        (travel) => new Date(travel.startAt) >= new Date(startAt),
      );
    }

    if (endAt) {
      filteredTravels = filteredTravels.filter(
        (travel) => new Date(travel.endAt) <= new Date(endAt),
      );
    }

    if (sortOrder) {
      filteredTravels = filteredTravels.reverse();
    }

    if (query) {
      filteredTravels = filteredTravels.filter(
        (travel) =>
          travel.travelName.toLowerCase().includes(query.toLowerCase()) ||
          travel.location.toLowerCase().includes(query.toLowerCase()),
      );
    }

    const pageSize = 5;
    const totalPages = Math.ceil(filteredTravels.length / pageSize);
    const isLastPage = page * pageSize >= filteredTravels.length;

    const paginatedTravels = filteredTravels.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    const response = {
      currentPage: page,
      totalPages,
      isFirst: page === 1,
      isLast: isLastPage,
      travels: paginatedTravels,
    };

    return HttpResponse.json(response);
  }),
];

export default travelListInfinity;
