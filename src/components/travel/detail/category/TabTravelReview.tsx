'use client';

import NoResult from '@/components/common/NoResult';
import Link from 'next/link';
import ReviewCardAddText from '@/components/card/Review/ReviewCardAddText';
import useGetTravelReview from '@/queries/travel/useGetTravelReview';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SpinnerIcon from '@/assets/spinner_round.svg';
import ReviewRate from '../reviewRate/ReviewRate';

const TabTravelReview = ({ travelId }: { travelId: number }) => {
  const { ref, inView } = useInView();
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetTravelReview({ travelId });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex h-5 w-5 flex-col items-center justify-center gap-5 p-8">
        <SpinnerIcon className="animate-spin" />
      </div>
    );
  }
  if (isError) return <div>에러</div>;

  if (data && data.pages[0].data.content.length === 0) {
    return <NoResult label="아직 작성된 리뷰가 없어요!" height="h-64" />;
  }

  return (
    <section>
      <div className="flex flex-col gap-6">
        <ReviewRate travelId={travelId} />

        <div className="flex flex-col gap-4">
          {data &&
            data.pages.map((reviewList) =>
              reviewList.data.content.map((review) => (
                <Link href={`/review/${review.id}`} key={review.id}>
                  <ReviewCardAddText
                    nickname={review.nickname}
                    reviewImage={review.reviewImage}
                    content={review.title}
                    score={review.starRating}
                  />
                </Link>
              )),
            )}
        </div>
      </div>
      <div ref={ref} className="loading-indicator">
        {isLoading && <SpinnerIcon className="animate-spin" />}
      </div>
    </section>
  );
};

export default TabTravelReview;
