import Pagenation from '@/components/common/pagenation/Pagenation';
import { useState } from 'react';
import myReviewListMock from '@/mocks/data/review/mypage/reviewListMock';
import MyReviewCard from '@/components/card/myReview/MyReviewCard';
import NoTravel from '../myTravel/NoTravel';

// 임시 선언 - 나중에 데이터 받아오면 삭제
const reviewList = myReviewListMock.reviews;
const { total } = myReviewListMock;

const Written = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(total / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="mx-auto w-[335px] pb-10">
      <div className="grid grid-cols-2 gap-4 pb-4">
        {total > 0 &&
          reviewList.map((review) => (
            <MyReviewCard
              key={review.reviewId}
              reviewId={review.reviewId}
              image={review.reviewImage}
              title={review.title}
              content={review.content}
              score={review.score}
              travelLocation={review.travelLocation}
              createdAt={review.createdAt}
            />
          ))}
      </div>
      {total === 0 && <NoTravel message="아직 다녀온 여행이 없어요!" />}

      {totalPages > 1 && (
        <Pagenation
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </section>
  );
};

export default Written;
