'use client';

import TravelContents from '@/components/travel/detail/TravelContents';
import { useQuery } from '@tanstack/react-query';
import { getTravelDetail } from '@/api/travelApi';
import useGetUser from '@/queries/user/useGetUser';
import TravelDetailCategory from './TravelDetailCategory';
import TravelImage from './TravelImage';
import TravelButtons from './TravelButtons';

const TravelDetail = ({ id }: { id: string }) => {
  const { data: userInfo } = useGetUser();
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

  const isParticipation = Boolean(
    travelDetail &&
      travelDetail.participant.find(
        (user) => user.id === (userInfo && userInfo.userId),
      ),
  );
  const organizer =
    travelDetail &&
    travelDetail.participant.find((part) => part.role === 'ORGANIZER');
  const dateOver = travelDetail && new Date() > new Date(travelDetail.endAt);

  return (
    <>
      {isLoading && <div>로딩중</div>}
      {travelDetail && (
        <article className="relative m-auto mb-32 flex max-w-[1216px] flex-col items-center gap-[22px] md:grid md:px-10 xl:mb-24 xl:grid-cols-[652px_540px]">
          <TravelImage
            name={travelDetail.name}
            image={travelDetail.image}
            endAt={travelDetail.endAt}
            registrationEnd={travelDetail.registrationEnd}
          />

          <div className="flex w-full flex-col items-center md:pt-5 xl:sticky xl:top-10 xl:max-w-[540px] xl:pt-0">
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
            {!dateOver && (
              <TravelButtons
                className="mt-5 hidden xl:block"
                travelId={travelDetail.travelId}
                organizer={organizer?.id}
                isParticipation={isParticipation}
              />
            )}
          </div>

          <TravelDetailCategory
            travelId={travelDetail.travelId}
            hashTags={travelDetail.hashTags}
            isParticipation={isParticipation}
            description={travelDetail.description}
            tripDuration={travelDetail.tripDuration}
            travelPlan={travelDetail.travelPlan}
            startAt={travelDetail.startAt}
            endAt={travelDetail.endAt}
            organizer={organizer}
          />
          {!dateOver && (
            <TravelButtons
              className="xl:hidden"
              travelId={travelDetail.travelId}
              organizer={organizer?.id}
              isParticipation={isParticipation}
            />
          )}
        </article>
      )}
    </>
  );
};
export default TravelDetail;
