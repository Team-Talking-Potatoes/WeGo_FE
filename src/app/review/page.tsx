import ReviewHeader from '@/components/review/reviewHeader/ReviewHeader';
import ReviewList from '@/components/review/reviewList/ReviewList';

const ReviewPage = () => {
  return (
    <div className="flex flex-col px-5 pb-[104px] pt-[60px]">
      <ReviewHeader />
      <ReviewList />
    </div>
  );
};

export default ReviewPage;
