export interface Review {
  reviewId: number;
  id: number;
  title: string;
  nickname?: string;
  profileImage?: string;
  imageUrl: string;
  reviewImage: string;
  content: string;
  score?: number;
  starRating: number;
  travelLocation: string;
  createdAt: string;
  isLast: boolean;
  likesFlag?: boolean;
}

export interface ReviewResponse {
  content: Review[];
  currentPage: number;
  size: number;
  total: number;
  hasNext: boolean;
}

export interface Filters {
  sortOrder: 'createdAt' | 'popular';
}
export interface ReviewListFilters {
  sortOrder: 'LATEST' | 'POPULAR';
}

export interface ReviewDetail {
  reviewId: number;
  travelId: number;
  travelTitle: string;
  userProfileImage: string;
  nickname: string;
  title: string;
  comment: string;
  starRating: number;
  reviewImages: string[];
  likesCount: number;
  likesFlag: boolean;
  travelLocation: string;
  createdAt: string;
}

export interface ReviewDetailResponse {
  status: string;
  data: ReviewDetail;
}

export interface CreateReview {
  score: number;
  content: string;
  reviewImage: File[];
}
