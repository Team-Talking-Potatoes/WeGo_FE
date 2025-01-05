import ReviewModal from '@/components/review/new/ReviewModal';
import { Suspense } from 'react';
import WriteReviewPage from '../../new/page';

const CreateReview = () => {
  return (
    <ReviewModal>
      <Suspense fallback={<div>로딩중...</div>}>
        <WriteReviewPage />
      </Suspense>
    </ReviewModal>
  );
};

export default CreateReview;
