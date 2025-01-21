export interface Review {
  // 리뷰 정보
  reviewId: number;
  reviewImage: string;
  title?: string;
  content?: string;
  comment?: string;
  reviewImages?: string[];
  starRating?: number;
  likesCount?: number;
  likesFlag?: boolean;
  createdAt?: string;
  travelLocation?: string;

  // 여행 정보
  travelId?: number;
  travelTitle?: string;

  // 유저 정보
  nickname?: string;
  profileImage?: string;
}

export interface ReviewForm {
  travelId: number;
  title: string;
  comment: string;
  starRating: number;
  organizerReviewTags: string;
  images: string[];
}

export interface Filters {
  sortOrder: 'createdAt' | 'popular';
}

export interface ReviewListFilters {
  sortOrder: 'LATEST' | 'POPULAR';
}
