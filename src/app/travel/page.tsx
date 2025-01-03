import SkeletonTravelFilter from '@/components/common/skeleton/travelList/SkeletonTravelFilter';
import SkeletonTravelListHeader from '@/components/common/skeleton/travelList/SkeletonTravelListHeader';
import TravelFilter from '@/components/travel/list/TravelFilter';
import TravelHeader from '@/components/travel/list/TravelHeader';
import TravelList from '@/components/travel/list/TravelList';
import { Suspense } from 'react';

const TravelPage = () => {
  return (
    <section className="m-auto flex max-w-[1480px] flex-col items-center justify-center px-5 pb-[75px] pt-[60px] md:px-10">
      <Suspense fallback={<SkeletonTravelListHeader />}>
        <TravelHeader />
      </Suspense>
      <Suspense fallback={<SkeletonTravelFilter />}>
        <TravelFilter />
      </Suspense>

      <TravelList />
    </section>
  );
};
export default TravelPage;
