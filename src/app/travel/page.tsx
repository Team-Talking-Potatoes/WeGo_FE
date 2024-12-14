import TravelHeader from '@/components/travel/list/TravelHeader';
import TravelListContainer from '@/components/travel/list/TravelListContainer';

const TravelPage = () => {
  return (
    <section className="flex flex-col px-5 pb-[75px] pt-[60px]">
      <TravelHeader />
      <TravelListContainer />
    </section>
  );
};
export default TravelPage;
