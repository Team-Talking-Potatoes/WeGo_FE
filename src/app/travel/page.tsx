import TravelListContainer from '@/components/travel/list/TravelListContainer';

const TravelPage = () => {
  return (
    <section className="m-auto flex max-w-[1480px] flex-col items-center justify-center px-5 pb-[75px] pt-[60px] md:px-10">
      <TravelListContainer />
    </section>
  );
};
export default TravelPage;
