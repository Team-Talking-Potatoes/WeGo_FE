import { ReviewListFilters } from '@/@types/review';
import { create } from 'zustand';

interface ReviewStore {
  filters: ReviewListFilters;
  setFilters: (filters: ReviewListFilters) => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  filters: {
    sortOrder: 'LATEST',
    pageParam: 0,
    size: 12,
  },
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
