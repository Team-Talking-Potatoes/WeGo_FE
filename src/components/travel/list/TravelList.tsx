'use client';

import { getTravels } from '@/api/travelApi';
import TravelCard from '@/components/card/TravelCard';
import NoReault from '@/components/common/NoReault';
import { useTravelStore } from '@/store/useTravelStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SpinnerIcon from '@/assets/spinner_round.svg';
import { formatStartDate } from '@/utils/dateChageKr';

const TravelList = () => {
  const { ref, inView } = useInView();
  const filters = useTravelStore((state) => state.filters);

  const {
    data: travelListData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['travels', filters],
    queryFn: ({ pageParam }) => getTravels({ pageParam, ...filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return !lastPage.isLast ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (filters.searchText) fetchPreviousPage();
  }, [filters.searchText, fetchPreviousPage]);

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

  if (isLoading)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5 p-8">
        Loading...
        <SpinnerIcon className="animate-spin" />
      </div>
    );
  if (isError) return <div>에러</div>;

  return (
    <div className="h-full justify-center">
      {travelListData &&
        travelListData.pages.map((page) => (
          <section
            key={`page-${page.currentPage}`}
            className="flex flex-col justify-center divide-y divide-line-normal border-b"
          >
            {page.travels.length === 0 ? (
              <NoReault label="아직 등록된 여행이 없어요!" height="h-64" />
            ) : (
              page.travels.map((travel) => (
                <article key={travel.travelId} className="py-5">
                  <TravelCard
                    travelId={travel.travelId}
                    image={travel.image}
                    isDomestic={travel.isDomestic}
                    travelName={travel.travelName}
                    location={travel.location}
                    maxTravelMateCount={travel.maxTravelMateCount}
                    currentTravelMateCount={travel.currentTravelMateCount}
                    startAt={travel.startAt}
                    endAt={travel.endAt}
                    formattedStartDate={formatStartDate(travel.startAt)}
                    checkMark
                    isChecked
                  />
                </article>
              ))
            )}
          </section>
        ))}
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
    </div>
  );
};

export default TravelList;
