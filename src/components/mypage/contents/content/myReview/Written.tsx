import Pagination from '@/components/common/pagination/Pagination';
import { useState } from 'react';
import ReviewCard from '@/components/card/Review/ReviewCard';
import useMyReview from '@/queries/review/useMyReview';
import NoTravel from '../myTravel/NoTravel';

const Written = () => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: reviews } = useMyReview(itemsPerPage, currentPage - 1);
  const totalPages = reviews ? Math.ceil(reviews.total / itemsPerPage) : 0;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section
      className="w-full max-w-[335px] pb-10 md:max-w-[688px] xl:max-w-[1400px]"
      data-testid="written-reviews"
    >
      {reviews && reviews.total > 0 ? (
        <div className="grid grid-cols-2 gap-4 pb-4 md:grid-cols-3 xl:grid-cols-6">
          {reviews.reviews.map((review) => (
            <ReviewCard
              key={review.id}
              reviewId={review.id}
              image={review.reviewImage}
              title={review.title}
              content={review.content}
              score={review.starRating}
              travelLocation={review.travelLocation}
              createdAt={review.createdAt}
            />
          ))}
        </div>
      ) : (
        <NoTravel message="아직 작성한 리뷰가 없어요!" />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </section>
  );
};

export default Written;
