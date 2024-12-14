'use client';

import { Button } from '@/components/common/button/Button';
import { useRouter } from 'next/navigation';

const CreateReviewButtons = () => {
  const router = useRouter();

  return (
    <section className="flex justify-center gap-2.5">
      <Button
        handler={() => {
          router.back();
        }}
        label="취소"
        fill="white"
        className="h-[38px] w-[120px]"
      />
      <Button type="submit" label="확인" className="h-[38px] w-[120px]" />
    </section>
  );
};

export default CreateReviewButtons;
