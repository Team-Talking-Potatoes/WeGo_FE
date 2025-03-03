import { http, HttpResponse } from 'msw';
import travelData from '@/mocks/data/travel/travelListInfitity.json';

export const travelListInfinity = http.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/travels`,
  async ({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const startAt = params.get('startAt');
    const endAt = params.get('endAt');
    const isDomestic = params.get('isDomestic');
    const searchText = params.get('query');
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    let filteredData = [...travelData.travels];
    if (startAt) {
      filteredData = filteredData.filter(
        (travel) => new Date(travel.startAt) >= new Date(startAt),
      );
    }
    if (endAt) {
      filteredData = filteredData.filter(
        (travel) => new Date(travel.endAt) <= new Date(endAt),
      );
    }
    if (isDomestic !== null) {
      filteredData = filteredData.filter(
        (travel) => String(travel.isDomestic) === isDomestic,
      );
    }
    if (searchText) {
      filteredData = filteredData.filter((travel) =>
        travel.travelName.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    const PAGE_SIZE = 8;
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return HttpResponse.json({
      currentPage: page,
      hasNext: endIndex < filteredData.length,
      travels: paginatedData,
    });
  },
);
