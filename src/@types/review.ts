export interface Review {
  reviewId: number;
  title: string;
  nickname?: string;
  profileImage?: string;
  reviewImage: string;
  content: string;
  score: number;
  travelLocation: string;
  createdAt: string;
  isLast: boolean;
  isLiked?: boolean;
}

export interface ReviewResponse {
  reviews: Review[];
  currentPage: number;
  size: number;
  total: number;
  hasNext: boolean;
}

export interface Filters {
  sortOrder: 'createdAt' | 'popular';
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
