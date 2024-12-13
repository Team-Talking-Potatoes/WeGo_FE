import { Filters } from '@/@types/travel';
import { create } from 'zustand';

interface TravelStore {
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
}

export const useTravelStore = create<TravelStore>((set) => ({
  filters: {
    startAt: '',
    endAt: '',
    isDomestic: null,
    sortOrder: null,
    searchText: '',
  },
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}));
