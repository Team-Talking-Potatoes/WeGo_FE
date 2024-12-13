'use client';

import { getTravels } from '@/api/travelApi';
import TravelCard from '@/components/card/TravelCard';
import NoReault from '@/components/common/NoReault';
import { useTravelStore } from '@/store/useTravelStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import LeftIcon from '@/assets/left.svg';

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

  if (isLoading) return <div>로딩중</div>;
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
                    travelLocation={travel.travelLocation}
                    maxParticipant={travel.maxParticipant}
                    currentParticipant={travel.currentParticipant}
                    startDate={travel.startDate}
                    formattedStartDate={travel.formattedStartDate}
                    checkMark
                    isChecked
                  />
                </article>
              ))
            )}
          </section>
        ))}
      {hasNextPage && (
        <div
          ref={ref}
          className="flex h-16 w-full justify-center p-5"
          aria-label="여행 정보를 불러오는 중입니다."
        >
          <LeftIcon className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default TravelList;
