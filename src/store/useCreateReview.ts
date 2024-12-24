import { create } from 'zustand';

interface CreateReviewStore {
  travelId: number;
  countStar: number;
  title: string;
  comment: string;
  selectedFiles: File[];
  prevImage: (URL | string)[];
  setTravelId: (travelId: number) => void;
  setCountStar: (countStar: number) => void;
  setTitle: (title: string) => void;
  setComment: (comment: string) => void;
  setSelectedFiles: (selectedFiles: File[]) => void;
  setPrevImage: (prevImage: (URL | string)[]) => void;
  resetStore: () => void;
}

const useCreateReviewStore = create<CreateReviewStore>((set) => ({
  travelId: 0,
  countStar: 0,
  title: '',
  comment: '',
  selectedFiles: [],
  prevImage: [],
  setTravelId: (travelId) => set({ travelId }),
  setCountStar: (countStar) => set({ countStar }),
  setTitle: (title) => set({ title }),
  setComment: (comment) => set({ comment }),
  setSelectedFiles: (selectedFiles) => set({ selectedFiles }),
  setPrevImage: (prevImage) => set({ prevImage }),
  resetStore: () =>
    set({
      travelId: 0,
      countStar: 0,
      title: '',
      comment: '',
      selectedFiles: [],
      prevImage: [],
    }),
}));

export default useCreateReviewStore;
