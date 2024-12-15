import { create } from 'zustand';

interface CreateReviewStore {
  countStar: number;
  textValue: string;
  selectedFiles: File[];
  setCountStar: (countStar: number) => void;
  setTextValue: (textValue: string) => void;
  setSelectedFiles: (selectedFiles: File[]) => void;
  resetStore: () => void;
}

const useCreateReviewStore = create<CreateReviewStore>((set) => ({
  countStar: 0,
  textValue: '',
  selectedFiles: [],
  setCountStar: (countStar) => set({ countStar }),
  setTextValue: (textValue) => set({ textValue }),
  setSelectedFiles: (selectedFiles) => set({ selectedFiles }),
  resetStore: () => set({ countStar: 0, textValue: '', selectedFiles: [] }),
}));

export default useCreateReviewStore;
