import useGetTravelReviewRating from '@/queries/travel/useGetTravelReviewRating';
import SpinnerIcon from '@/assets/spinner_round.svg';
import NoResult from '@/components/common/NoResult';
import ScoreBox from './ScoreBox';

const ReviewRate = ({ travelId }: { travelId: number }) => {
  const { data, isLoading, isError } = useGetTravelReviewRating({
    travelId,
  });

  if (isLoading) return <SpinnerIcon className="animate-spin" />;
  if (isError)
    return (
      <div className="flex h-40 w-full items-center justify-center rounded border border-gray-100 px-3.5 py-5">
        <NoResult label="잠시 후 다시 시도해주세요" />
      </div>
    );

  if (data) {
    return (
      <ScoreBox
        averageScore={data.data.totalRating}
        scoreFrequency={data.data.reviewRatings}
      />
    );
  }

  return null;
};

export default ReviewRate;
