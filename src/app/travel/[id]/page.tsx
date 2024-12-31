import Header from '@/components/common/header/Header';
import TravelDetailContainer from '@/components/travel/detail/TravelDetailContainer';

const TravelDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <section className="mx-auto mt-[60px] xl:mt-20 xl:max-w-[1296px]">
      <Header title="여행상세" />
      <TravelDetailContainer id={id} />
    </section>
  );
};
export default TravelDetailPage;
