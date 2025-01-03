import Skeleton from '../Skeleton';

const SkeletonTravelCardBig = () => {
  return (
    <div className="flex aspect-[335/290] w-full flex-col overflow-hidden rounded border">
      <Skeleton className="h-[48.28%]" />
      <div className="flex h-[51.72%] w-full flex-col justify-between gap-1.5 rounded px-4 py-5">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-5 w-12 rounded" />
          <Skeleton className="h-6 w-full rounded" />
        </div>

        <div className="flex-end flex w-full flex-col gap-[1.125rem]">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-1.5 w-full rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonTravelCardBig;
