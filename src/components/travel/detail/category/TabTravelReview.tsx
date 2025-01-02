import { getTravelReview } from '@/api/review/review';
import { useQuery } from '@tanstack/react-query';
import NoResult from '@/components/common/NoResult';
import { QUERY_KEYS } from '@/constants/querykeys';
import Link from 'next/link';
import ReviewCardAddText from '@/components/card/Review/ReviewCardAddText';
import ScoreBox from './ScoreBox';

const TabTravelReview = ({ travelId }: { travelId: number }) => {
  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.TRAVEL.TRAVEL_DETAIL_REVIEW(`${travelId}`),
    queryFn: () => getTravelReview(travelId),
  });

  if (error && !isFetching) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }

  const reviewList = data?.data;
  if (reviewList && reviewList.length === 0) {
    return <NoResult label="아직 작성된 리뷰가 없어요!" height="h-64" />;
  }

  const totalScore =
    reviewList?.reduce((sum, review) => sum + review.score, 0) || 0;

  const averageScore = reviewList?.length
    ? (totalScore / reviewList.length).toFixed(1)
    : '0.0';

  const scoreFrequency = reviewList?.reduce(
    (acc, review) => {
      acc[review.score] = (acc[review.score] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  return (
    <section>
      {isLoading && <div>로딩중</div>}
      {reviewList && (
        <div className="flex flex-col gap-6">
          <ScoreBox
            total={reviewList.length}
            averageScore={averageScore}
            scoreFrequency={scoreFrequency}
          />
          <div className="flex flex-col gap-4">
            {reviewList.map((review) => (
              <Link href={`/review/${review.reviewId}`} key={review.reviewId}>
                <ReviewCardAddText
                  nickname={review.nickname}
                  reviewImage={review.reviewImage}
                  content={review.content}
                  score={review.score}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TabTravelReview;
