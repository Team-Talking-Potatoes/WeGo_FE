import { BaseResponse } from '@/@types/api';
import { Review } from '@/@types/review';
import Header from '@/components/common/header/Header';
import ReviewDetailContainer from '@/components/review/detail/ReviewDetailContainer';
import { QueryClient } from '@tanstack/react-query';
import { getReviewDetail } from '@/api/review/review';

const ReviewDetailPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => getReviewDetail(id),
  });

  const data = queryClient.getQueryData<BaseResponse<Review>>([
    'reviews',
    'detail',
    id,
  ]);

  return (
    <div className="pb-[120px]">
      <Header title="리뷰 상세보기" />
      <ReviewDetailContainer data={data?.data} />
    </div>
  );
};

export default ReviewDetailPage;
