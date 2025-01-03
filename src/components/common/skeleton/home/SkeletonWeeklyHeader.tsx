import Skeleton from '../Skeleton';

const SkeletonWeeklyHeader = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="body-2-m h-8 w-48 rounded" />
      <Skeleton className="body-2-m h-[22px] w-80 rounded" />
    </div>
  );
};

export default SkeletonWeeklyHeader;
