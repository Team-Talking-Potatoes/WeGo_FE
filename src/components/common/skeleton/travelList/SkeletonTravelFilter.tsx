import Skeleton from '../Skeleton';

const SkeletonTravelFilter = () => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-4">
        <Skeleton className="h-5 w-[69px] rounded" />
        <Skeleton className="h-5 w-[69px] rounded" />
      </div>
      <Skeleton className="h-5 w-5 rounded" />
    </div>
  );
};

export default SkeletonTravelFilter;
