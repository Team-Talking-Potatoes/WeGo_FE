import { Filters } from '@/@types/travel';

// 사용 예시
// queryKey: QUERY_KEYS.REVIEW.POPULAR_TRAVEL;
// queryKey: QUERY_KEYS.TRAVEL.TRAVEL_DETAIL_REVIEW(`${id}`)
export const QUERY_KEYS = {
  TRAVEL: {
    POPULAR_TRAVEL: ['popularTravel'] as const,
    TRAVEL_LIST: (filter: Filters) => ['travels', filter] as const,
    TRAVEL_DELETE: (id: string) => ['travels', id] as const,
    TRAVEL_DETAIL_REVIEW: (id: string) => ['travels', id, 'reviews'] as const,
  },
  REVIEW: {
    POPULAR_REVIEW: ['popularReview'] as const,
    CREATE_REVIEW_SELECT_TRAVEL: (size: number) =>
      ['writableTravel', size] as const,
  },
  USER: {
    POPULAR_USER: ['popularUser'] as const,
  },
};
