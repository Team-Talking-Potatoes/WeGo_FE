import { Filters } from '@/@types/travel';

const buildTravelUrl = ({
  startAt,
  endAt,
  isDomestic,
  sortOrder,
  searchText,
}: Filters): string => {
  const params = new URLSearchParams({
    startAt: startAt || '',
    endAt: endAt || '',
    isDomestic: isDomestic !== null ? String(isDomestic) : '',
    sortOrder: sortOrder !== null ? String(sortOrder) : '',
    query: searchText || '',
  });

  if (startAt) params.append('startAt', startAt);
  if (endAt) params.append('endAt', endAt);
  if (isDomestic !== null) params.append('isDomestic', String(isDomestic));
  if (sortOrder !== null) params.append('sortOrder', String(sortOrder));
  if (searchText) params.append('query', searchText);

  return `/api/travels?${params.toString()}`;
};

export default buildTravelUrl;
