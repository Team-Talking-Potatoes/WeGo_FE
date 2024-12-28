import ReviewList from '@/components/review/reviewList/ReviewList';
import ReviewHeader from '@/components/review/reviewList/reviewHeader/ReviewHeader';

const ReviewPage = () => {
  return (
    <div className="flex justify-center px-5 pb-[104px] pt-[60px]">
      <div className="flex max-w-[335px] flex-col md:max-w-[688px] xl:max-w-[1400px]">
        <ReviewHeader />
        <ReviewList />
      </div>
    </div>
  );
};

export default ReviewPage;
