import { Filters } from '@/@types/travel';

// 사용 예시
// queryKey: QUERY_KEYS.REVIEW.popularReview;
// queryKey: QUERY_KEYS.TRAVEL.travelDetailReview(`${id}`)
export const QUERY_KEYS = {
  TRAVEL: {
    popularTravel: ['popularTravel'] as const,
    travelList: (filter: Filters) => ['travels', filter] as const,
    travelDetail: (id: string) => ['travels', id] as const,
    travelDetailReview: (id: string) => ['travels', id, 'reviews'] as const,
  },
  REVIEW: {
    popularReview: ['popularReview'] as const,
  },
  USER: {
    popularUser: ['popularUser'] as const,
  },
};
