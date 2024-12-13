'use client';

import { getTravels } from '@/api/travelApi';
import TravelCard from '@/components/card/TravelCard';
import NoReault from '@/components/common/NoReault';
import { useTravelStore } from '@/store/useTravelStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

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
      return lastPage.next ? pages.length + 1 : undefined;
    },
    enabled: true,
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    if (filters.searchText) fetchPreviousPage();
  }, [filters.searchText, fetchPreviousPage]);

  useEffect(() => {
    if (inView) {
      // console.log('도달');
    }
    if (inView && hasNextPage) {
      // console.log('여기');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="h-full">
      {travelListData &&
        travelListData.pages.map((page) => (
          <section
            key={page.travels ? `page-${page.travels[0]?.travelId}` : 'page'}
            className="flex flex-col justify-center gap-6 px-5 py-[50px]"
          >
            {page.travels.length === 0 ? (
              <NoReault label="아직 등록된 여행이 없어요!" height="h-64" />
            ) : (
              page.travels.map((travel) => (
                <TravelCard
                  key={travel.travelId}
                  travelId={travel.travelId}
                  image={travel.image}
                  isDomestic={travel.isDomestic}
                  travelName={travel.travelName}
                  travelLocation={travel.travelLocation}
                  maxParticipant={travel.maxParticipant}
                  currentParticipant={travel.currentParticipant}
                  startDate={travel.startDate}
                  formattedStartDate={travel.formattedStartDate}
                />
              ))
            )}
          </section>
        ))}
      <div ref={ref} className="h-6">
        여기
      </div>
    </div>
  );
};

export default TravelList;
