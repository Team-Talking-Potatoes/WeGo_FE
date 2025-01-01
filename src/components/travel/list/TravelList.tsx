'use client';

import NoResult from '@/components/common/NoResult';
import { useTravelListStore } from '@/store/useTravelListStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SpinnerIcon from '@/assets/spinner_round.svg';
import { checkTomorrow } from '@/utils/dateChangeKr';
import useGetTravelsList from '@/queries/travel/useGetTravelsList';
import { InitialFilters } from '@/@types/travel';
import TravelCardBig from '@/components/card/travel/TravelCardBig';

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
      // 1초 지연 후에 fetchNextPage 호출
      const timeoutId = setTimeout(() => {
        fetchNextPage();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5 p-8">
        Loading...
        <SpinnerIcon className="animate-spin" />
      </div>
    );
  }

  if (isError) return <div>에러{error?.message}</div>;

  if (travelListData?.pages[0].travels.length === 0) {
    return (
      <NoResult
        key="no-result"
        label="아직 등록된 여행이 없어요!"
        height="h-64"
      />
    );
  }

  return (
    <>
      <div className="grid h-full gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
        {travelListData &&
          travelListData.pages.map((page) =>
            page.travels.map((travel) => (
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
                checkMark
                isChecked
              />
            )),
          )}
      </div>

      {hasNextPage ? (
        <div
          ref={ref}
          className="mb-20 flex h-6 w-full justify-center p-5"
          aria-label="여행 정보를 불러오는 중입니다."
        >
          <SpinnerIcon className="animate-spin" />
        </div>
      ) : (
        <div aria-label="마지막 페이지 입니다" />
      )}
    </>
  );
};

export default TravelList;
