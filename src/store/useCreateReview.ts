import { create } from 'zustand';

interface CreateReviewStore {
  travelId: number;
  hashTags: Set<string>;
  countStar: number;
  title: string;
  comment: string;
  selectedFiles: File[];
  prevImage: (URL | string)[];
  errorMessages: {
    travelId: string;
    countStar: string;
    input: string;
    selectedFiles: string;
  };

  setTravelId: (travelId: number) => void;
  setHashTags: (hashTag: string) => void;
  setCountStar: (countStar: number) => void;
  setTitle: (title: string) => void;
  setComment: (comment: string) => void;
  setSelectedFiles: (selectedFiles: File[]) => void;
  setPrevImage: (prevImage: (URL | string)[]) => void;
  resetStore: () => void;
  setErrorMessage: (
    field: keyof CreateReviewStore['errorMessages'],
    message: string,
  ) => void;
}

const useCreateReviewStore = create<CreateReviewStore>((set, get) => ({
  travelId: 0,
  hashTags: new Set(),
  countStar: 0,
  title: '',
  comment: '',
  selectedFiles: [],
  prevImage: [],
  errorMessages: {
    travelId: '',
    countStar: '',
    input: '',
    selectedFiles: '',
  },

  setTravelId: (travelId) => set({ travelId }),
  setHashTags: (hashTag) => {
    const { hashTags } = get();
    if (hashTags.has(hashTag)) {
      hashTags.delete(hashTag);
    } else {
      hashTags.add(hashTag);
    }
    set({ hashTags: new Set(hashTags) });
  },
  setCountStar: (countStar) => set({ countStar }),
  setTitle: (title) => set({ title }),
  setComment: (comment) => set({ comment }),
  setSelectedFiles: (selectedFiles) => set({ selectedFiles }),
  setPrevImage: (prevImage) => set({ prevImage }),
  setErrorMessage: (field, message) =>
    set((state) => ({
      errorMessages: {
        ...state.errorMessages,
        [field]: message,
      },
    })),

  resetStore: () =>
    set({
      travelId: 0,
      hashTags: new Set(),
      countStar: 0,
      title: '',
      comment: '',
      selectedFiles: [],
      prevImage: [],
      errorMessages: {
        travelId: '',
        countStar: '',
        input: '',
        selectedFiles: '',
      },
    }),
}));

export default useCreateReviewStore;
