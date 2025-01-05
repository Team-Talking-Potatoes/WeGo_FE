import { createReview } from '@/api/review/createReview';
import useCreateReviewStore from '@/store/useCreateReview';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useQueryErrorHandler } from '../common/errorHandler';

export const useCreateReview = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    travelId,
    hashTags,
    countStar,
    title,
    comment,
    selectedFiles,
    resetStore,
    setErrorMessage,
  } = useCreateReviewStore();
  const handleQueryError = useQueryErrorHandler();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => createReview(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReview'] });
      queryClient.invalidateQueries({ queryKey: ['review', 'listPage'] });
      resetStore();
      router.back();
    },
    onError: (error: any) => {
      handleQueryError(error);
    },
  });

  const handleSubmit = () => {
    let hasError = false;
    if (travelId === 0) {
      setErrorMessage('travelId', '여행을 선택해주세요.');
      hasError = true;
    }
    if (countStar === 0) {
      setErrorMessage('countStar', '별점을 선택해주세요.');
      hasError = true;
    }
    if (title === '' || comment === '') {
      setErrorMessage('input', '내용을 입력해주세요.');
      hasError = true;
    }
    if (selectedFiles.length === 0) {
      setErrorMessage('selectedFiles', '이미지를 선택해주세요.');
      hasError = true;
    }

    if (hasError) return;

    const formData = new FormData();

    if (hashTags.size > 0) {
      const hashTagString = Array.from(hashTags)
        .map((tag) => `#${tag}`)
        .join('');
      formData.append('organizerReviewTags', hashTagString);
    }

    formData.append('travelId', travelId.toString());
    formData.append('starRating', countStar.toString());
    formData.append('title', title);
    formData.append('comment', comment);

    selectedFiles.forEach((file) => {
      formData.append(`images`, file);
    });

    mutation.mutate(formData);
  };

  return { handleSubmit };
};
