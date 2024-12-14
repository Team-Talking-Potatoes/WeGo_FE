'use client';

import { createReview } from '@/api/reviewApi';
import { Button } from '@/components/common/button/Button';
import useCreateReviewStore from '@/store/useCreateReview';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const CreateReviewButtons = () => {
  const router = useRouter();
  const { countStar, textValue, selectedFiles, resetStore } =
    useCreateReviewStore();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => createReview(formData),
    onSuccess: () => {
      resetStore();
      router.back();
      router.push('/review');
    },
    onError: (error: any) => {
      console.error('리뷰 생성 중 오류 발생:', error);
    },
  });

  const handleSubmit = () => {
    if (countStar === 0) return;
    if (textValue === '') return;
    if (selectedFiles.length === 0) return;

    const formData = new FormData();

    formData.append('score', countStar.toString());
    formData.append('content', textValue);
    selectedFiles.forEach((file) => {
      formData.append(`images`, file);
    });

    mutation.mutate(formData);
  };

  return (
    <section className="flex justify-center gap-2.5">
      <Button
        handler={() => {
          resetStore();
          router.back();
        }}
        label="취소"
        fill="white"
        className="h-[38px] w-[120px]"
      />
      <Button
        handler={() => handleSubmit()}
        type="button"
        label="확인"
        className="h-[38px] w-[120px]"
      />
    </section>
  );
};

export default CreateReviewButtons;
