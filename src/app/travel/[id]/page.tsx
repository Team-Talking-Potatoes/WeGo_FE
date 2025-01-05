import Header from '@/components/common/header/Header';
import SkeletonTravelDetail from '@/components/common/skeleton/travelDetail/SkeletonTravelDetail';
import KakaoShare from '@/components/script/KakaoShare';
import TravelDetailContainer from '@/components/travel/detail/TravelDetailContainer';
import { Suspense } from 'react';

const TravelDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <section className="mx-auto mt-[60px] xl:mt-20 xl:max-w-[1296px]">
      <Header title="여행상세" />
      <Suspense fallback={<SkeletonTravelDetail />}>
        <TravelDetailContainer id={id} />
      </Suspense>
      <KakaoShare />
    </section>
  );
};
export default TravelDetailPage;
