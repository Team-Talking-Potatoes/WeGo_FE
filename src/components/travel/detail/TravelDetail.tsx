import TravelInformation from '@/components/travel/detail/information/TravelInformation';
import { Travel } from '@/@types/travel';
import dayjs from 'dayjs';
import TravelDetailCategory from './TravelDetailCategory';
import TravelImage from './image/TravelImage';
import TravelButtons from './buttons/TravelButtons';

const TravelDetail = ({ travelDetail }: { travelDetail: Travel }) => {
  const organizer =
    travelDetail &&
    travelDetail.participant.find((part) => part.role === 'ORGANIZER');
  const dateOver = travelDetail && dayjs().isAfter(dayjs(travelDetail.endAt));

  return (
    <div>
      {travelDetail && (
        <article className="relative mb-32 grid gap-[22px] md:grid-cols-[1fr_1fr] md:px-10 xl:mb-24 xl:grid-cols-[652px_auto]">
          <TravelImage
            name={travelDetail.travelName}
            image={travelDetail.travelImage}
            endAt={travelDetail.endAt}
            registrationEnd={travelDetail.registrationEnd}
          />

          <div className="flex w-full flex-col items-center md:pt-5 xl:sticky xl:top-28 xl:pt-0">
            <TravelInformation
              travelLocation={travelDetail.travelLocation}
              travelName={travelDetail.travelName}
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
                className="hidden xl:block"
                travelId={travelDetail.travelId}
                organizer={organizer?.userId}
                participationFlag={travelDetail.participationFlag}
              />
            )}
          </div>
          <TravelDetailCategory
            travelId={travelDetail.travelId}
            hashTags={travelDetail.hashTags}
            participationFlag={travelDetail.participationFlag}
            description={travelDetail.description}
            tripDuration={travelDetail.tripDuration}
            travelPlan={travelDetail.travelPlan}
            startAt={travelDetail.startAt}
            endAt={travelDetail.endAt}
            organizer={organizer}
            bookmarkFlag={travelDetail.bookmarkFlag}
          />
          {!dateOver && (
            <TravelButtons
              className="xl:hidden"
              travelId={travelDetail.travelId}
              organizer={organizer?.userId}
              participationFlag={travelDetail.participationFlag}
            />
          )}
        </article>
      )}
    </div>
  );
};
export default TravelDetail;
