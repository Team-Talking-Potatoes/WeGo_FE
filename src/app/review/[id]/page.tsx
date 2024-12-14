import FormHeader from '@/components/common/formheader/FormHeader';
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
      <>
        <FormHeader title="리뷰 상세보기" />
        <ReviewDetailContainer />
      </>
    );
  };

export default ReviewDetailPage;
