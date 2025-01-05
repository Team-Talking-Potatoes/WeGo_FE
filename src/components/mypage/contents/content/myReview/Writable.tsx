import { useState } from 'react';
import TravelCard from '@/components/card/travel/TravelCard';
import { checkTomorrow } from '@/utils/dateChangeKr';
import Link from 'next/link';
import { TravelList } from '@/@types/travel';
import { useWritableTravel } from '@/queries/travel/useGetMyTravel';
import Pagination from '@/components/common/pagination/Pagination';
import HorizontalDivider from '@/components/common/divider/HorizontalDivider';
import MyTravelCardSkeleton from '@/components/mypage/skeleton/MyTravelCardSkeleton';
import useCreateReviewStore from '@/store/useCreateReview';
import NoTravel from '../myTravel/NoTravel';

const Writable = () => {
  const { setTravelName, setTravelId } = useCreateReviewStore();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: travels, isLoading } = useWritableTravel(
    itemsPerPage,
    currentPage - 1,
  );
  const totalPages = travels ? Math.ceil(travels.total / itemsPerPage) : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) return <MyTravelCardSkeleton />;

  return (
    <section
      className="w-full max-w-[335px] pb-10 md:max-w-[688px] xl:max-w-[1400px]"
      data-testid="writable-travels"
    >
      {travels && travels.total > 0 ? (
        <div className="grid w-full gap-5 xl:grid-cols-2 xl:gap-6">
          {travels.content.map((travel: TravelList) => (
            <div key={travel.travelId} className="relative">
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
                closed
              />
              <HorizontalDivider className="mt-5 xl:mt-6" />

              <Link href="/review/new">
                <button
                  type="button"
                  onClick={() => {
                    setTravelName(travel.travelName);
                    setTravelId(travel.travelId);
                  }}
                  className="body-3-m absolute right-0 top-0 text-primary-normal underline"
                >
                  리뷰 작성
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <NoTravel message="아직 다녀온 여행이 없어요!" />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </section>
  );
};

export default Writable;
