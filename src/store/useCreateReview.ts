import { create } from 'zustand';

interface CreateReviewStore {
  countStar: number;
  title: string;
  comment: string;
  selectedFiles: File[];
  setCountStar: (countStar: number) => void;
  setTitle: (title: string) => void;
  setComment: (comment: string) => void;
  setSelectedFiles: (selectedFiles: File[]) => void;
  resetStore: () => void;
}

const useCreateReviewStore = create<CreateReviewStore>((set) => ({
  countStar: 0,
  title: '',
  comment: '',
  selectedFiles: [],
  setCountStar: (countStar) => set({ countStar }),
  setTitle: (title) => set({ title }),
  setComment: (comment) => set({ comment }),
  setSelectedFiles: (selectedFiles) => set({ selectedFiles }),
  resetStore: () => set({ countStar: 0, comment: '', selectedFiles: [] }),
}));

export default useCreateReviewStore;
