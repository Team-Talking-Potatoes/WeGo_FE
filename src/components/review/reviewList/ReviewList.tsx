import ReviewContents from './reviewContents/ReviewContents';
import ReviewFilter from './reviewFilter/ReviewFilter';

const ReviewList = () => {
  return (
    <section>
      <ReviewFilter />
      <ReviewContents />
    </section>
  );
};

export default ReviewList;
