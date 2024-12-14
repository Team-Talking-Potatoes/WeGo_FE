import { Filters } from '@/@types/review';
import { create } from 'zustand';

interface ReviewStore {
  filters: Partial<Filters>;
  setFilters: (filters: Filters) => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  filters: {
    sortOrder: 'createdAt',
  },
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
