import { QueryClient } from '@tanstack/react-query';
import { getTravelDetail } from '@/api/travel/travels';
import { QUERY_KEYS } from '@/constants/querykeys';
import TravelDetail from './TravelDetail';

const TravelDetailContainer = async ({ id }: { id: string }) => {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: QUERY_KEYS.TRAVEL.TRAVEL_DETAIL(id),
    queryFn: () => getTravelDetail({ id }),
  });

  return <TravelDetail travelDetail={data.data} />;
};

export default TravelDetailContainer;
