'use client';

import TravelContents from '@/components/travel/detail/TravelContents';
import { useQuery } from '@tanstack/react-query';
import { getTravelDetail } from '@/api/travelApi';
import TravelDetailCategory from './TravelDetailCategory';
import TravelImage from './TravelImage';

const TravelDetail = ({ id }: { id: string }) => {
  const {
    data: travelDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['travels', { id }],
    queryFn: () => getTravelDetail({ id }),
  });

  if (error) {
    console.error('에러', { error });
    return (
      <div>
        데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      {isLoading && <div>로딩중</div>}
      {travelDetail && (
        <article className="relative m-auto flex max-w-[1480px] flex-col items-center gap-[22px] px-5 md:grid md:grid-cols-2 md:grid-rows-[360px_auto] md:gap-9 md:px-10 xl:grid-cols-[764px_600px]">
          <TravelImage
            name={travelDetail.name}
            image={travelDetail.image}
            endAt={travelDetail.endAt}
            registrationEnd={travelDetail.registrationEnd}
          />
          <TravelContents
            name={travelDetail.name}
            isDomestic={travelDetail.isDomestic}
            minTravelMateCount={travelDetail.minTravelMateCount}
            maxTravelMateCount={travelDetail.maxTravelMateCount}
            startAt={travelDetail.startAt}
            endAt={travelDetail.endAt}
            registrationEnd={travelDetail.registrationEnd}
            participant={travelDetail.participant}
          />
          <TravelDetailCategory
            travelId={travelDetail.travelId}
            hashTags={travelDetail.hashTags}
            participant={travelDetail.participant}
            description={travelDetail.description}
            tripDuration={travelDetail.tripDuration}
            travelPlan={travelDetail.travelPlan}
            startAt={travelDetail.startAt}
            endAt={travelDetail.endAt}
          />
        </article>
      )}
    </>
  );
};
export default TravelDetail;
