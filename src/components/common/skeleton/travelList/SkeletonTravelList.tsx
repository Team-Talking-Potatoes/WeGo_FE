import SkeletonTravelCardBig from '../card/SkeletonTravelCardBig';

const SkeletonTravelList = () => {
  return (
    <div className="grid h-full w-full gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
      {Array.from({ length: 12 }, (_, i) => (
        <SkeletonTravelCardBig key={i} />
      ))}
    </div>
  );
};

export default SkeletonTravelList;
