import TravelCard from '@/components/card/TravelCard';
import Pagenation from '@/components/common/pagenation/Pagenation';
import travelList from '@/mocks/data/travel/travelList.json';
import { formatStartDate } from '@/utils/dateChageKr';
import { useState } from 'react';

const totalPages = 5;

const Upcomming = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 4;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="mx-auto flex max-w-[335px] flex-col justify-center gap-6 pb-10">
      {travelList.map((travel) => (
        <TravelCard
          key={travel.travelId}
          travelId={travel.travelId}
          travelName={travel.travelName}
          maxParticipant={travel.maxParticipant}
          isDomestic={travel.isDomestic}
          travelLocation={travel.travelLocation}
          currentParticipant={travel.currentParticipant}
          startDate={travel.startDate}
          formattedStartDate={formatStartDate(travel.startDate)}
        />
      ))}

      <Pagenation
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </section>
  );
};

export default Upcomming;
