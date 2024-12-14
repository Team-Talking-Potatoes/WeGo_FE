import HeartIcon from '@/assets/icon/heart_36px.svg';
import StarIcon from '@/assets/icon/star_20px.svg';
import DateIcon from '@/assets/icon/date_18px.svg';
import UserIcon from '@/components/common/user/UserIcon';
import ReviewThumbnail from './reviewThumbnail/ReviewThumbnail';
import ReviewContent from './reviewContent/ReviewContent';

const nickname = '여행 토끼';
const profileImage = '/user.jpg';
const title = '정선 겨울 여행갔다왔어요.';
const reviewImages = ['/test1.png', '/test2.png', '/test3.png'];
const liked = true;
const content =
  '정선의 겨울은 너무 아름다웠어요!\n 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.';
const score = 5;
// const travelLocation = '강원도 정선';
const createdAt = '2024-04-01';

// props {nickname, profileImage, title, reviewImages, liked, content, score, travelLocation, createdAt }
const ReviewContainer = () => {
  // const handleLike = () => {
  // 좋아요 api 호출
  // };

  return (
    <main className="flex flex-col justify-center">
      <ReviewThumbnail reviewImages={reviewImages} />

      <div className="flex w-full items-center justify-between border border-line-normal px-5 py-2.5">
        <div className="body-2-m flex items-center gap-2 text-label-neutral">
          <UserIcon nickname={nickname} profileImage={profileImage} size="xs" />
          <p className="body-2-m">{nickname}</p>
        </div>
        <button
          type="button"
          // onClick={handleLike}
        >
          <HeartIcon fill={liked ? 'red' : 'none'} />
        </button>
      </div>

      <ReviewContent title={title} content={content} />

      <div className="text-grey-500 body-2-m mt-4 flex w-full items-center justify-between px-5">
        <div className="flex items-center gap-1">
          <DateIcon />
          <p>{createdAt}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon />
          <p>{score}</p>
        </div>
      </div>
    </main>
  );
};

export default ReviewContainer;
