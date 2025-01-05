'use client';

import NoResult from '@/components/common/NoResult';
import { useTravelListStore } from '@/store/useTravelListStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { checkTomorrow } from '@/utils/dateChangeKr';
import useGetTravelsList from '@/queries/travel/useGetTravelsList';
import { InitialFilters } from '@/@types/travel';
import TravelCardBig from '@/components/card/travel/TravelCardBig';
import SkeletonTravelList from '@/components/common/skeleton/travelList/SkeletonTravelList';
import SkeletonTravelCardBig from '@/components/common/skeleton/card/SkeletonTravelCardBig';

const TravelList = () => {
  const { ref, inView } = useInView();
  const filters = useTravelListStore((state) => state.filters);

  const {
    data: travelListData,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useGetTravelsList(filters);

  useEffect(() => {
    if (filters !== InitialFilters) {
      fetchNextPage();
    }
  }, [filters, fetchNextPage]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <SkeletonTravelList />
      </div>
    );
  }

  if (isError) return <div>에러{error?.message}</div>;

  if (travelListData?.pages[0].data.content.length === 0) {
    return (
      <NoResult
        key="no-result"
        label="아직 등록된 여행이 없어요!"
        height="h-64"
      />
    );
  }

  return (
    <div className="mb-5 grid h-full w-full gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
      {travelListData &&
        travelListData.pages.map((page) =>
          page.data.content.map((travel) => (
            <TravelCardBig
              key={travel.travelId}
              travelId={travel.travelId}
              image={travel.image}
              isDomestic={travel.isDomestic}
              travelName={travel.travelName}
              location={travel.location}
              maxTravelMateCount={travel.maxTravelMateCount}
              currentTravelMateCount={travel.currentTravelMateCount}
              startAt={travel.startAt}
              endAt={travel.endAt}
              formattedStartDate={checkTomorrow(travel.startAt)}
              isBookmark={travel.isBookmark}
            />
          )),
        )}
      {hasNextPage ? (
        <>
          <div
            ref={ref}
            className="flex w-full justify-center"
            aria-label="여행 정보를 불러오는 중입니다."
          >
            <SkeletonTravelCardBig />
          </div>
          {[1, 2, 3].map((v) => (
            <SkeletonTravelCardBig key={v} />
          ))}
        </>
      ) : (
        <div aria-label="마지막 페이지 입니다" />
      )}
    </div>
  );
};

export default TravelList;
