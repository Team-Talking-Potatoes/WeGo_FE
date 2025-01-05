import SkeletonTravelFilter from './SkeletonTravelFilter';
import SkeletonTravelListHeader from './SkeletonTravelListHeader';

const SkeletonTravel = () => {
  return (
    <div>
      <SkeletonTravelListHeader />
      <SkeletonTravelFilter />
    </div>
  );
};

export default SkeletonTravel;
