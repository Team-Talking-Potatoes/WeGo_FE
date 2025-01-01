import ReviewList from '@/components/review/reviewList/ReviewList';
import ReviewHeader from '@/components/review/reviewList/reviewHeader/ReviewHeader';
import { Suspense } from 'react';

const ReviewPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-center px-5 pb-[104px] pt-[60px] md:px-10">
        <div className="flex w-full max-w-[1400px] flex-col">
          <ReviewHeader />
          <ReviewList />
        </div>
      </div>
    </Suspense>
  );
};

export default ReviewPage;
