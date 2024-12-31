'use client';

import TravelContents from '@/components/travel/detail/TravelContents';
import { TravelDetail as TravelType } from '@/@types/travel';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/api/user/userInfoApi';
import TravelDetailCategory from './TravelDetailCategory';
import TravelImage from './TravelImage';
import TravelButtons from './TravelButtons';

const TravelDetail = ({ travelDetail }: { travelDetail: TravelType }) => {
  const queryClient = useQueryClient();
  const loginUser = queryClient.getQueryData<UserInfo>(['user']);
  const loginUserId = loginUser?.userId;

  const isParticipation = Boolean(
    travelDetail &&
      travelDetail.participant.find((user) => user.id === loginUserId),
  );
  const organizer =
    travelDetail &&
    travelDetail.participant.find((part) => part.role === 'ORGANIZER');
  const dateOver = travelDetail && new Date() > new Date(travelDetail.endAt);

  return (
    <div>
      {travelDetail && (
        <article className="relative mb-32 grid gap-[22px] md:grid-cols-[1fr_1fr] md:px-10 xl:mb-24 xl:grid-cols-[652px_auto]">
          <TravelImage
            name={travelDetail.name}
            image={travelDetail.image}
            endAt={travelDetail.endAt}
            registrationEnd={travelDetail.registrationEnd}
          />

          <div className="flex w-full flex-col items-center md:pt-5 xl:sticky xl:top-28 xl:pt-0">
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
    </div>
  );
};
export default TravelDetail;
