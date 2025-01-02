import ReviewList from '@/components/review/reviewList/ReviewList';
import ReviewHeader from '@/components/review/reviewList/reviewHeader/ReviewHeader';

const ReviewPage = () => {
  return (
    <div className="flex min-h-[101dvh] justify-center px-5 pb-[104px] pt-[60px] md:px-10">
      <div className="flex w-full max-w-[1400px] flex-col">
        <ReviewHeader />
        <ReviewList />
      </div>
    </div>
  );
};

export default ReviewPage;
