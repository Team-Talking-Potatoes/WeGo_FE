import { Filters } from '@/@types/travel';
import dayjs from 'dayjs';

const buildTravelUrl = (filters: Filters, pageParam?: number): string => {
  const params = new URLSearchParams();

  if (filters.startAt) {
    const startDate = dayjs(filters.startAt).format('YYYYMMDD');
    params.append('startAt', startDate);
  }
  if (filters.endAt) {
    const endDate = dayjs(filters.endAt).format('YYYYMMDD');
    params.append('endAt', endDate);
  }
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
