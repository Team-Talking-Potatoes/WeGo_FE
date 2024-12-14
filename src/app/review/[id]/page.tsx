import FormHeader from '@/components/common/formheader/FormHeader';
import ReviewContainer from '@/components/review/detail/ReviewContainer';
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
        <ReviewContainer
        // nickname={data.user.nickname}
        // profileImage={data.user.profileImage}
        // title={data.title}
        // reviewImages={data.reviewImages}
        // liked={data.liked}
        // content={data.content}
        // score={data.score}
        // travelLocation={data.travelLocation}
        // createdAt={data.createdAt}
        />
      </>
    );
  };

export default ReviewDetailPage;
