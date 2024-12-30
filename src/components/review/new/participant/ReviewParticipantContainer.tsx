import BlueStart from '@/assets/star_24px.svg';
import useCreateReviewStore from '@/store/useCreateReview';
import InputImage from './InputImage';
import ReviewComment from './ReviewComment';

const ReviewParticipantContainer = () => {
  const { countStar, setCountStar, errorMessages } = useCreateReviewStore();

  const handleClick = (index: number) => {
    setCountStar(index + 1);
  };

  const sectionCss = 'flex w-full flex-col';

  return (
    <>
      <section className={`${sectionCss}`}>
        <header className="pb-3">만족스러운 여행이었나요?</header>

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
        {errorMessages.countStar && countStar === 0 && (
          <p className="body-3-r text-status-error">
            {errorMessages.countStar}
          </p>
        )}
      </section>
      <ReviewComment />
      <section className={`${sectionCss}`}>
        <header>여행의 순간을 함께 보여주세요.</header>
        <main aria-label="여행 후기 이미지를 등록해주세요">
          <InputImage />
          <span className="body-3-r text-primary-normal">
            이미지는 최대 5개 등록 가능합니다.
          </span>
        </main>
      </section>
    </>
  );
};

export default ReviewParticipantContainer;
