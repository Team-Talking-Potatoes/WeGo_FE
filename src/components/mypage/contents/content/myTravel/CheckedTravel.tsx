import TravelCard from '@/components/card/TravelCard';
import Pagenation from '@/components/common/pagenation/Pagenation';
import travelListMock from '@/mocks/data/travel/mypage/travelListMock';
import { formatStartDate } from '@/utils/dateChageKr';
import { useState } from 'react';

const total = 1;
const travelList = travelListMock.checkedTravel;

const CheckedTravel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(total / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="mx-auto flex w-[335px] flex-col justify-center gap-6 pb-10">
      {travelList.map((travel) => (
        <TravelCard
          key={travel.travelId}
          travelId={travel.travelId}
          travelName={travel.travelName}
          maxParticipant={travel.maxParticipant}
          isDomestic={travel.isDomestic}
          travelLocation={travel.travelLocation}
          image={travel.image}
          currentParticipant={travel.currentParticipant}
          startDate={travel.startDate}
          formattedStartDate={formatStartDate(travel.startDate)}
          checkMark
          isChecked
        />
      ))}

      {totalPages > 4 && (
        <Pagenation
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </section>
  );
};

export default CheckedTravel;
