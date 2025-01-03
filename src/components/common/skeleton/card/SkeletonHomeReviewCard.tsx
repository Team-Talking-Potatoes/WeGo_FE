import Skeleton from '../Skeleton';

const SkeletonHomeReviewCard = () => {
  return (
    <div>
      <Skeleton className="h-[240px] w-[180px] rounded md:h-[260px] md:w-[200px]" />
      <Skeleton className="mt-[10px] h-6 w-20 rounded" />
    </div>
  );
};

export default SkeletonHomeReviewCard;
