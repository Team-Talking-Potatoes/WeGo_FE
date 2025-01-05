import ReviewModal from '@/components/review/new/ReviewModal';
import { Suspense } from 'react';
import WriteReviewPage from '../../new/page';

const CreateReview = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <ReviewModal>
        <WriteReviewPage />
      </ReviewModal>
    </Suspense>
  );
};

export default CreateReview;
