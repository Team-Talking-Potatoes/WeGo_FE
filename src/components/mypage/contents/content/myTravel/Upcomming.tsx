import TravelCard from '@/components/card/travel/TravelCard';
import Pagination from '@/components/common/pagination/Pagination';
import { checkTomorrow } from '@/utils/dateChageKr';
import { useState } from 'react';
import { useUpcommingTravel } from '@/queries/travel/useGetMyTravel';
import { TravelList } from '@/@types/travel';
import HorizontalDivider from '@/components/common/divider/HorizontalDivider';
import NoTravel from './NoTravel';

const Upcomming = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: travels } = useUpcommingTravel(itemsPerPage, currentPage - 1);
  const totalPages = travels ? Math.ceil(travels.total / itemsPerPage) : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section
      className="w-full max-w-[335px] pb-10 md:max-w-[688px] xl:max-w-[1400px]"
      data-testid="upcomming-travels"
    >
      {travels && travels.total > 0 ? (
        <div className="grid w-full gap-5 xl:grid-cols-2 xl:gap-6">
          {travels.travels.map((travel: TravelList) => (
            <div key={travel.travelId}>
              <TravelCard
                key={travel.travelId}
                travelId={travel.travelId}
                travelName={travel.travelName}
                maxTravelMateCount={travel.maxTravelMateCount}
                currentTravelMateCount={travel.currentTravelMateCount}
                isDomestic={travel.isDomestic}
                location={travel.location}
                image={travel.image}
                startAt={travel.startAt}
                endAt={travel.endAt}
                formattedStartDate={checkTomorrow(travel.startAt)}
              />
              <HorizontalDivider className="mt-5 xl:mt-6" />
            </div>
          ))}
        </div>
      ) : (
        <NoTravel message="아직 참여한 여행이 없어요!" />
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </section>
  );
};

export default Upcomming;
