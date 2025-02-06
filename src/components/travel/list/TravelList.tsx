'use client';

import NoResult from '@/components/common/NoResult';
import { useTravelListStore } from '@/store/useTravelListStore';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import useGetTravelsList from '@/queries/travel/useGetTravelsList';
import { InitialFilters } from '@/@types/travel';
import TravelCardBig from '@/components/card/travel/TravelCardBig';
import SkeletonTravelList from '@/components/common/skeleton/travelList/SkeletonTravelList';
import SkeletonTravelCardBig from '@/components/common/skeleton/card/SkeletonTravelCardBig';
import { ListSkip } from '@/components/a11y/ListSkip';

const TravelList = () => {
  const { ref, inView } = useInView();
  const [skipMode, setSkipMode] = useState(false);
  const filters = useTravelListStore((state) => state.filters);

  const {
    data: travelListData,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useGetTravelsList(filters);

  const handleSkipClick = () => {
    setSkipMode(true);
    setTimeout(() => setSkipMode(false), 8000);
  };

  useEffect(() => {
    if (filters !== InitialFilters) {
      fetchNextPage();
    }
  }, [filters, fetchNextPage]);

  useEffect(() => {
    if (!skipMode && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, skipMode]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <SkeletonTravelList />
      </div>
    );
  }

  if (isError) return <div>에러가 발생했습니다. {error?.message}</div>;

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
    <>
      <ul className="mb-5 grid h-full w-full gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
        {travelListData &&
          travelListData.pages.map((page, pageIndex) =>
            page.data.content.map((travel, travelIndex) => (
              <li key={travel.travelId}>
                <TravelCardBig
                  travelId={travel.travelId}
                  travelImage={travel.travelImage}
                  isDomestic={travel.isDomestic}
                  travelName={travel.travelName}
                  travelLocation={travel.travelLocation}
                  maxTravelMateCount={travel.maxTravelMateCount}
                  currentTravelMateCount={travel.currentTravelMateCount}
                  startAt={travel.startAt}
                  endAt={travel.endAt}
                  bookmarkFlag={travel.bookmarkFlag}
                />
                <ListSkip.Link
                  skipId="travel-list-end"
                  skipLabel="여행 리스트"
                  currentElement={pageIndex * 12 + travelIndex + 1}
                  onClick={handleSkipClick}
                />
              </li>
            )),
          )}

        {hasNextPage && !skipMode && (
          <>
            <li
              ref={ref}
              className="flex w-full justify-center"
              aria-label="여행 정보를 불러오는 중입니다."
            >
              <SkeletonTravelCardBig />
            </li>
            {Array.from({ length: 3 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`skeleton-${index}`}>
                <SkeletonTravelCardBig />
              </li>
            ))}
          </>
        )}
      </ul>
      <ListSkip.Destination skipId="travel-list-end" skipLabel="여행 리스트" />
    </>
  );
};

export default TravelList;
