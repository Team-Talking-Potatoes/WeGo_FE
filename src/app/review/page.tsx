import ReviewList from '@/components/review/reviewList/ReviewList';
import ReviewHeader from '@/components/review/reviewList/reviewHeader/ReviewHeader';
import { Suspense } from 'react';

const ReviewPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-center px-5 pb-[104px] pt-[60px]">
        <div className="flex w-full max-w-[335px] flex-col md:max-w-[688px] xl:max-w-[1400px]">
          <ReviewHeader />
          <ReviewList />
        </div>
      </div>
    </Suspense>
  );
};

export default ReviewPage;
