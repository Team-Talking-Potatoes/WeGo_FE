export interface Review {
  // 리뷰 정보
  reviewId: number;
  reviewImage: string;
  title: string;
  content: string;
  comment: string;
  reviewImages: string[];
  starRating: number;
  likesCount: number;
  likesFlag: boolean;
  createdAt: string;
  travelLocation: string;

  // 여행 정보
  travelId: number;
  travelTitle: string;

  // 유저 정보
  nickname: string;
  profileImage: string;
}

export interface ReviewRatings {
  totalReviews: number;
  oneStarReviews: number;
  twoStarReviews: number;
  threeStarReviews: number;
  fourStarReviews: number;
  fiveStarReviews: number;
}

export interface ReviewScore {
  totalRating: number;
  reviewRatings: ReviewRatings;
}

export interface ReviewListFilters {
  sortOrder: 'LATEST' | 'POPULAR';
  pageParam: number;
  size: number;
}
