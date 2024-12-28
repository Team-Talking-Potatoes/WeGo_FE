import Header from '@/components/common/header/Header';
import ReviewDetailContainer from '@/components/review/detail/ReviewDetailContainer';
// import { QueryClient } from '@tanstack/react-query';

const ReviewDetailPage = async () =>
  // { params }: { params: Promise<{ id: string }>; }
  {
    // const { id } = await params;
    // const queryClient = new QueryClient();
    // const data =await queryClient.prefetchQuery({
    //   queryKey: ['reviews', { id }],
    //   queryFn: () => getReviewDetail({ id }),
    // });

    return (
      <div className="pb-[120px]">
        <Header title="리뷰 상세보기" />
        <ReviewDetailContainer />
      </div>
    );
  };

export default ReviewDetailPage;
