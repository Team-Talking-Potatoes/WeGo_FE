import { Filters } from '@/@types/travel';

const buildTravelUrl = (filters: Filters, pageParam?: number): string => {
  const params = new URLSearchParams();

  if (filters.startAt) params.append('startAt', filters.startAt);
  if (filters.endAt) params.append('endAt', filters.endAt);
  if (filters.isDomestic != null)
    params.append('isDomestic', String(filters.isDomestic));
  if (filters.sortOrder != null)
    params.append('sortOrder', String(filters.sortOrder));
  if (filters.searchText) params.append('query', filters.searchText);
  if (!pageParam) {
    params.append('page', '1');
  } else {
    params.append('page', String(pageParam));
  }

  return `/travels?${params.toString()}`;
};

export default buildTravelUrl;
