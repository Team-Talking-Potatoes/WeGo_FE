export interface Review {
  reviewId: number;
  title: string;
  nickname: string;
  reviewImage: string;
  content: string;
  score: number;
  travelLocation: string;
  createdAt: string;
}

export interface Filters {
  sortOrder: 'createdAt' | 'popular' | null;
}
