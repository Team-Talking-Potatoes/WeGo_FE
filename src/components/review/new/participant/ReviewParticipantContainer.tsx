import BlueStart from '@/assets/star_24px.svg';
import useCreateReviewStore from '@/store/useCreateReview';
import InputImage from './InputImage';
import ReviewComment from './ReviewComment';

const ReviewParticipantContainer = () => {
  const { countStar, setCountStar, errorMessages } = useCreateReviewStore();

  const handleClick = (index: number) => {
    setCountStar(index + 1);
  };

  return (
    <>
      <section className="flex w-full flex-col">
        <header
          className={`${errorMessages.countStar && countStar === 0 ? '' : 'pb-3'}`}
        >
          만족스러운 여행이었나요?
        </header>
        {errorMessages.countStar && countStar === 0 && (
          <p className="body-3-r text-status-error">
            {errorMessages.countStar}
          </p>
        )}
        <main className="flex" aria-label="별점을 매겨주세요">
          {[1, 2, 3, 4, 5].map((v, index) => (
            <BlueStart
              key={`star-${v}`}
              className={`cursor-pointer ${index < countStar ? 'text-primary-normal' : 'text-label-disable'}`}
              onClick={() => handleClick(index)}
              aria-label={`${v}점`}
            />
          ))}
        </main>
      </section>
      <ReviewComment />
      <InputImage />
    </>
  );
};

export default ReviewParticipantContainer;
