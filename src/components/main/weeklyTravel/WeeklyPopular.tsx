'use client';

import { getWeekNumber } from '@/utils/dateChageKr';
import { useMemo } from 'react';
import TravelCardBig from '@/components/card/TravelCardBig';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/querykeys';
import { getPopularTravel } from '@/api/travelApi';
import WeeklyHeader from './WeeklyHeader';

const WeeklyPopular = () => {
  const {
    data: travelList,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.TRAVEL.POPULAR_TRAVEL,
    queryFn: getPopularTravel,
  });

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
    <section className="flex flex-col justify-center gap-6 px-5 pb-8 pt-[50px] md:px-10">
      <WeeklyHeader month={month} week={week} />
      {isLoading && <div>로딩중 WeeklyPopular</div>}
      <div className="flex flex-col gap-5">
        {travelList &&
          travelList.map((travel) => (
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
              checkMark
              isChecked
            />
          ))}
      </div>
    </section>
  );
};
export default WeeklyPopular;
