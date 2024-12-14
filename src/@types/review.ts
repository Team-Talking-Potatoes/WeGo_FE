export interface Review {
  reviewId: number;
  title: string;
  nickname: string;
  reviewImage: string;
  content: string;
  score: number;
  travelLocation: string;
  createdAt: string;
  isLast: boolean;
}

export interface ReviewResponse {
  reviews: Review[];
  currentPage: number;
  size: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface Filters {
  sortOrder: 'createdAt' | 'popular';
}
