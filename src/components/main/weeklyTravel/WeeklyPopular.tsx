import { getWeekNumber } from '@/utils/dateChangeKr';
import TravelCardBig from '@/components/card/travel/TravelCardBig';
import { Travel } from '@/@types/travel';
import WeeklyHeader from './WeeklyHeader';

const WeeklyPopular = ({ travelList }: { travelList: Travel[] }) => {
  const month = new Date().getMonth() + 1;
  const week = getWeekNumber();

  return (
    <section className="m-auto flex max-w-[1480px] flex-col justify-center gap-6 px-5 pb-8 pt-[50px] md:px-10 md:pb-12 xl:pb-16">
      <WeeklyHeader month={month} week={week} />

      <div className="flex w-full flex-col items-center justify-center gap-5 xl:grid xl:grid-cols-2">
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
