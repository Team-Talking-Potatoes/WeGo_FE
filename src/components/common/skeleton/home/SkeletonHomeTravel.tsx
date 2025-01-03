import SkeletonTravelCardBig from '../card/SkeletonTravelCardBig';
import SkeletonWeeklyHeader from './SkeletonWeeklyHeader';

const SkeletonHomeTravel = () => {
  return (
    <section className="m-auto flex flex-col justify-center gap-6 px-5 pb-8 pt-[50px] md:px-10 md:pb-12 xl:max-w-[1480px] xl:pb-16">
      <SkeletonWeeklyHeader />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {[1, 2, 3, 4].map((v) => (
          <SkeletonTravelCardBig key={v} />
        ))}
      </div>
    </section>
  );
};

export default SkeletonHomeTravel;
