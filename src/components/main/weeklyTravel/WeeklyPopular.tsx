import TravelCardBig from '@/components/card/travel/TravelCardBig';
import { Travel } from '@/@types/travel';
import Link from 'next/link';
import ButtonRounded from '@/components/common/button/ButtonRounded';
import WeeklyHeader from './WeeklyHeader';

const WeeklyPopular = ({ travelList }: { travelList: Travel[] }) => {
  if (travelList.length === 0) {
    return (
      <section className="m-auto flex h-96 flex-col justify-center gap-6 px-5 pb-8 pt-[50px] md:px-10 md:pb-12 xl:max-w-[1480px] xl:pb-16">
        <WeeklyHeader />
        <div className="heading-1-sb flex h-80 w-full flex-col items-center justify-center gap-5 text-center">
          아직 여행모임이 없어요.
          <br />
          나의 취향을 담은 여행 모임을 한번 만들어 보세요!
          <Link href="/travel">
            <ButtonRounded label="첫 여행모임 만들기" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="m-auto flex flex-col justify-center gap-6 px-5 pb-8 pt-[50px] md:px-10 md:pb-12 xl:max-w-[1480px] xl:pb-16">
      <WeeklyHeader />
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
