import Skeleton from '../Skeleton';

const SkeletonTravelDetail = () => {
  return (
    <div className="mb-32 flex flex-wrap items-start justify-center gap-[22px] md:mx-10 md:flex-nowrap">
      <Skeleton className="h-[277px] max-h-[277px] w-full overflow-hidden md:mt-5 md:aspect-[309/277] md:h-full md:max-h-[392px] md:max-w-[48%] md:rounded xl:max-w-[652px]" />
      <div className="mx-5 flex w-full max-w-[540px] flex-col items-start md:mx-0 md:max-w-[48%] md:pt-5">
        <Skeleton className="h-6 w-12 rounded" />
        <Skeleton className="mb-4 mt-1.5 h-11 w-[50%] rounded border-b" />
        <div className="h-0.5 w-full bg-gray-100" />
        <div className="my-3 flex flex-col gap-2">
          <Skeleton className="h-5 w-60 rounded" />
          <Skeleton className="h-5 w-60 rounded" />
        </div>
        <Skeleton className="h-24 w-full rounded" />
      </div>
    </div>
  );
};

export default SkeletonTravelDetail;
