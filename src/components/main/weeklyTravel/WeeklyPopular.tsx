import { getWeekNumber } from '@/utils/dateChangeKr';
import TravelCardBig from '@/components/card/travel/TravelCardBig';
import { Travel } from '@/@types/travel';
import dayjs from 'dayjs';
import WeeklyHeader from './WeeklyHeader';

const WeeklyPopular = ({ travelList }: { travelList: Travel[] }) => {
  const month = dayjs().month() + 1;
  const week = getWeekNumber();

  return (
    <section className="m-auto flex flex-col justify-center gap-6 px-5 pb-8 pt-[50px] md:px-10 md:pb-12 xl:max-w-[1480px] xl:pb-16">
      <WeeklyHeader month={month} week={week} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
