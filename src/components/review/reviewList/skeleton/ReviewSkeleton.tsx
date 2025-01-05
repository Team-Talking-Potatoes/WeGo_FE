import Skeleton from '@/components/common/skeleton/Skeleton';

const ReviewSkeleton = () => {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-2 gap-x-[15px] gap-y-6 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`skeleton-${index}`}
            className="min-w-[160px] flex-1 xl:max-w-[332px]"
          >
            <div className="relative aspect-[160/210] w-full">
              <Skeleton className="h-full w-full rounded" />

              <div className="mt-3 flex justify-between">
                <Skeleton className="h-6 w-28" />

                <Skeleton className="h-6 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSkeleton;
