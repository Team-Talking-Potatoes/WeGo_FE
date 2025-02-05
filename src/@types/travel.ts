import { User } from './user';

export interface Travel {
  travelId: number;
  travelName: string;
  description: string;
  travelImage: string;
  expectedTripCost?: number;
  currentTravelMateCount: number;
  minTravelMateCount: number;
  maxTravelMateCount: number;
  hashTags: string;
  isDomestic: boolean;
  travelLocation: string;
  departureLocation?: string;
  startAt: string;
  endAt: string;
  registrationEnd: string;
  tripDuration: number;
  travelPlan: TravelPlan[];
  participant: Participant[];
  participationFlag: boolean | null;
  bookmarkFlag: boolean | null;
}

export interface TravelPlan {
  tripDay: number;
  tripOrderNumber: number;
  destination: string;
  description: string;
  travelPlanImage: string;
}

export type TravelCard = Pick<
  Travel,
  | 'travelId'
  | 'travelImage'
  | 'isDomestic'
  | 'travelName'
  | 'travelLocation'
  | 'maxTravelMateCount'
  | 'currentTravelMateCount'
  | 'startAt'
  | 'endAt'
  | 'bookmarkFlag'
>;

export interface Participant
  extends Pick<User, 'userId' | 'profileImage' | 'nickname'> {
  role: string;
}

export interface TravelReviewRateScore {
  oneStarReviews: number;
  twoStarReviews: number;
  threeStarReviews: number;
  fourStarReviews: number;
  fiveStarReviews: number;
  total: number;
}

export interface Filters {
  startAt: string;
  endAt: string;
  isDomestic: boolean | null;
  sortOrder: 'popular' | 'registrationEnd' | null;
  searchText: string;
}

export const InitialFilters = {
  startAt: '',
  endAt: '',
  isDomestic: null,
  sortOrder: null,
  searchText: '',
} as const;

export interface TravelParams {
  pageParam: number;
  filters?: Filters;
}

export interface TravelList {
  travelId: number;
  travelName: string;
  expectedTripCost: number;
  travelMateCount: number;
  isDomestic: boolean;
  travelStatus: string;
  location: string;
  image: string;
  startAt: string;
  endAt: string;
  maxTravelMateCount: number;
  currentTravelMateCount: number;
}

export interface MyTravel {
  content: Travel[];
  total: number;
  currentPage: number;
  hasNext: boolean;
}

export interface MyTravelResponse {
  status: string;
  data: MyTravel;
  total: number;
  currentPage: number;
  hasNext: boolean;
}
