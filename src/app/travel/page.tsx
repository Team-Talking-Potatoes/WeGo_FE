import SkeletonTravel from '@/components/common/skeleton/travelList/SkeletonTravel';
import TravelFilter from '@/components/travel/list/TravelFilter';
import TravelHeader from '@/components/travel/list/TravelHeader';
import TravelList from '@/components/travel/list/TravelList';
import { Suspense } from 'react';

const TravelPage = () => {
  return (
    <section className="m-auto flex max-w-[1480px] flex-col items-center justify-center px-5 pb-[75px] pt-[60px] md:px-10">
      <Suspense fallback={<SkeletonTravel />}>
        <TravelHeader />
        <TravelFilter />
        <TravelList />
      </Suspense>
    </section>
  );
};
export default TravelPage;
