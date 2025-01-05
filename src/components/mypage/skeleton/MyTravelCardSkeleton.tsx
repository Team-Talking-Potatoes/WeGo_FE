import Skeleton from '@/components/common/skeleton/Skeleton';

const MyTravelCardSkeleton = () => {
  return (
    <div className="w-full max-w-[335px] pb-10 md:max-w-[688px] xl:max-w-[1400px]">
      <div className="grid w-full gap-5 xl:grid-cols-2 xl:gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`skeleton-${index}`}>
            <div className="relative flex max-w-[335px] gap-4 md:max-w-[688px] md:gap-9">
              <Skeleton className="h-[120px] w-[100px] flex-shrink-0 rounded md:h-[160px] md:w-[223px]" />
              <div className="relative flex w-full flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-12 rounded-[20px]" />
                  <Skeleton className="h-6 w-full md:h-[26px]" />
                </div>
                <div className="flex flex-col gap-2.5">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
            <Skeleton className="mt-5 h-[1px] w-full max-w-[1400px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTravelCardSkeleton;
