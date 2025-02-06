'use client';

import ReviewCard from '@/components/card/Review/ReviewCard';
import useReview from '@/queries/review/useReview';
import { useReviewStore } from '@/store/useReviewStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListSkip } from '@/components/a11y/ListSkip';
import ReviewSkeleton from '../skeleton/ReviewSkeleton';

const ReviewContents = () => {
  const { ref, inView } = useInView();
  const filters = useReviewStore((state) => state.filters);

  const {
    data: reviewsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useReview(filters.sortOrder);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <ReviewSkeleton />;

  return (
    <div className="mt-3">
      {reviewsData && (
        <ul className="grid grid-cols-2 gap-x-[15px] gap-y-6 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {reviewsData.pages.map((page, pageIndex) =>
            page.data.content.map((review, reviewIndex) => (
              <li key={`${filters.sortOrder}-${review.reviewId}`}>
                <ReviewCard
                  reviewId={review.reviewId}
                  nickname={review.nickname}
                  profileImage={review.profileImage}
                  reviewImage={review.reviewImage}
                  title={review.title}
                  content={review.content}
                  starRating={review.starRating}
                  travelLocation={review.travelLocation}
                  createdAt={review.createdAt}
                  likesFlag={review.likesFlag ?? false}
                />
                <ListSkip.Link
                  skipId="review-list-end"
                  skipLabel="리뷰 리스트"
                  currentElement={pageIndex * 12 + reviewIndex + 1}
                />
              </li>
            )),
          )}
        </ul>
      )}

      {hasNextPage ? (
        <div ref={ref}>
          <ReviewSkeleton />
        </div>
      ) : null}

      <ListSkip.Destination skipId="review-list-end" skipLabel="리뷰 목록" />
    </div>
  );
};

export default ReviewContents;
