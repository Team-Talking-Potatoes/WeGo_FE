'use client';

import { formatStartDate, getWeekNumber } from '@/utils/dateChageKr';
import { useMemo } from 'react';
import TravelCard from '@/components/card/TravelCard';
import { useQuery } from '@tanstack/react-query';
import { fetchPopularTravel } from '@/api/travelApi';
import WeeklyHeader from './WeeklyHeader';

const WeeklyPopular = () => {
  const {
    data: travelList,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['travels', 'popular'],
    queryFn: fetchPopularTravel,
  });

  const startDateFormatted = useMemo(() => {
    if (!travelList) return [];
    return travelList.map((travel) => ({
      ...travel,
      formattedStartDate: formatStartDate(travel.startDate),
    }));
  }, [travelList]);

  const month = new Date().getMonth() + 1;
  const week = useMemo(() => getWeekNumber(), []);

  if (error && !isFetching) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <section className="flex flex-col justify-center px-5 pb-8 pt-[50px]">
      <WeeklyHeader month={month} week={week} />
      {isLoading && <div>로딩중 WeeklyPopular</div>}
      <div className="flex flex-col divide-y divide-line-normal">
        {startDateFormatted.map((travel) => (
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
        ))}
      </div>
    </section>
  );
};
export default WeeklyPopular;
