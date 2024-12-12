import travelListMock from '@/mocks/data/travel/mypage/travelListMock';
import { useState } from 'react';
import TravelCard from '@/components/card/TravelCard';
import Pagenation from '@/components/common/pagenation/Pagenation';
import { formatStartDate } from '@/utils/dateChageKr';
import Link from 'next/link';
import NoTravel from '../myTravel/NoTravel';

// 임시 선언 - 나중에 데이터 받아오면 삭제
const total = 1;
const travelList = travelListMock.checkedTravel;

const Writable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(total / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="mx-auto flex w-[335px] flex-col justify-center gap-6 pb-10">
      {total > 0 ? (
        travelList.map((travel) => (
          <div key={travel.travelId} className="relative">
            <TravelCard
              key={travel.travelId}
              travelId={travel.travelId}
              travelName={travel.travelName}
              maxParticipant={travel.maxParticipant}
              isDomestic={travel.isDomestic}
              travelLocation={travel.travelLocation}
              currentParticipant={travel.currentParticipant}
              image={travel.image}
              startDate={travel.startDate}
              formattedStartDate={formatStartDate(travel.startDate)}
              closed
            />

            <Link href="/">
              <button
                type="button"
                className="body-3-m absolute right-0 top-0 text-primary-normal underline"
              >
                리뷰 작성
              </button>
            </Link>
          </div>
        ))
      ) : (
        <NoTravel message="아직 다녀온 여행이 없어요!" />
      )}

      {totalPages > itemsPerPage && (
        <Pagenation
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </section>
  );
};

export default Writable;
