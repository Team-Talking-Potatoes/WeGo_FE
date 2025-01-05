'use client';

import ReviewCard from '@/components/card/Review/ReviewCard';
import useReview from '@/queries/review/useReview';
import { useReviewStore } from '@/store/useReviewStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ReviewSkeleton from '../skeleton/ReviewSkeleton';

const ReviewContents = () => {
  const { ref, inView } = useInView();
  const filters = useReviewStore((state) => state.filters);

  const {
    data: reviewsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useReview({
    sortOrder: filters.sortOrder,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <ReviewSkeleton />;

  return (
    <div className="mt-3">
      {reviewsData && (
        <div className="grid grid-cols-2 gap-x-[15px] gap-y-6 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {reviewsData.pages.map((page) =>
            page.data.content
              ? page.data.content.map((review) => (
                  <ReviewCard
                    key={`${filters.sortOrder}-${review.id}`}
                    reviewId={review.id}
                    nickname={review.nickname}
                    profileImage={review.profileImage}
                    image={review.reviewImage}
                    title={review.title}
                    content={review.content}
                    score={review.starRating}
                    travelLocation={review.travelLocation}
                    createdAt={review.createdAt}
                    isLiked={review.likesFlag ?? false}
                  />
                ))
              : null,
          )}
        </div>
      )}

      {hasNextPage ? (
        <div ref={ref}>
          <ReviewSkeleton />
        </div>
      ) : null}
    </div>
  );
};

export default ReviewContents;
