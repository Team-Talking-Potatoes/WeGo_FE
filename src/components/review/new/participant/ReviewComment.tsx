import Textarea from '@/components/common/textarea/Textarea';
import useCreateReviewStore from '@/store/useCreateReview';

const ReviewComment = () => {
  const { errorMessages, title, comment, setTitle, setComment } =
    useCreateReviewStore();
  const errorInput = errorMessages.input;
  return (
    <section className="flex w-full flex-col">
      <header
        className={`${(!errorInput || (errorInput && title && comment)) && 'pb-3'}`}
      >
        여행에 대한 후기를 남겨주세요!
      </header>

      <div>
        {errorInput && (title === '' || comment === '') && (
          <p className="body-3-r text-status-error">{errorInput}</p>
        )}
        <Textarea
          name="여행제목"
          value={title}
          size="small"
          placeholder="여행 제목을 입력해 주세요."
          onChange={(e) => setTitle(e.target.value)}
          className="body-2-m h-[40px] bg-background-alternative"
          maxLength={20}
          extraClassName={`${errorInput && title === '' && 'border-status-error'} bg-background-alternative w-full h-[60px] overflow-hidden`}
        />
        <Textarea
          name="여행후기"
          value={comment}
          size="small"
          placeholder="여행에 대한 다양한 후기를 공유해 주세요!"
          onChange={(e) => setComment(e.target.value)}
          extraClassName={`${errorInput && comment === '' && 'border-status-error'} bg-background-alternative w-full h-auto pb-7 overflow-hidden`}
          className="border-status-error bg-background-alternative custom-scrollbar"
          maxLength={100}
        />
      </div>
    </section>
  );
};

export default ReviewComment;
