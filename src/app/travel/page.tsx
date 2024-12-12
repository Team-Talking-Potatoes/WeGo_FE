import TravelHeader from '@/components/travel/list/TravelHeader';
import TravelListContainer from '@/components/travel/list/TravelListContainer';

const TravelPage = () => {
  return (
    <section className="flex flex-col gap-6 px-5 pb-28 pt-9">
      <TravelHeader />
      <TravelListContainer />
    </section>
  );
};
export default TravelPage;
