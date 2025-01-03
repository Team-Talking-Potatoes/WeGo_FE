import SkeletonHomeReviewCard from '../card/SkeletonHomeReviewCard';
import SkeletonWeeklyHeader from './SkeletonWeeklyHeader';

const SkeletonWeeklyReview = () => {
  return (
    <section className="flex flex-col justify-start gap-5 bg-black px-5 py-10 md:px-10">
      <SkeletonWeeklyHeader />
      <div className="flex gap-4 overflow-hidden md:gap-6 xl:max-w-[1400px] 2xl:m-auto">
        {[1, 2, 3].map((v) => (
          <SkeletonHomeReviewCard key={v} />
        ))}
      </div>
    </section>
  );
};

export default SkeletonWeeklyReview;
