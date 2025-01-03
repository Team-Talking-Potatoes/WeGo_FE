import Skeleton from '../Skeleton';

const SkeletonTravelListHeader = () => {
  return (
    <header className="grid w-full grid-cols-2 gap-6 pb-4 pt-9 lg:grid-cols-[132px_minmax(600px,_1fr)_100px] lg:pb-8">
      <Skeleton className="order-1 h-9 w-36 rounded lg:order-1 lg:col-span-1" />
      <div className="order-2 flex h-8 w-full flex-shrink-0 items-end justify-end lg:order-3">
        <Skeleton className="h-8 w-24 rounded-2xl" />
      </div>
      <Skeleton className="order-3 col-span-2 h-9 w-full max-w-[688px] rounded lg:order-2 lg:col-span-1" />
    </header>
  );
};

export default SkeletonTravelListHeader;
