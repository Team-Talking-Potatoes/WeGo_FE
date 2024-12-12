import { Filters } from '@/@types/travel';
import { create } from 'zustand';

interface TravelStore {
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
}

export const useTravelStore = create<TravelStore>((set) => ({
  filters: {
    searchText: '',
    isDomestic: null,
    sortOrder: null,
    startAt: '',
    endAt: '',
  },
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}));
