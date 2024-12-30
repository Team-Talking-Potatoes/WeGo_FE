import HeartIcon from '@/assets/icon/review/heart_24px.svg';
import StarIcon from '@/assets/icon/star_20px.svg';
import UserIcon from '@/components/common/user/UserIcon';
import cn from '@/utils/cn';
import ReviewThumbnail from './reviewThumbnail/ReviewThumbnail';
import ReviewContent from './reviewContent/ReviewContent';

const nickname = '여행 토끼';
const profileImage = '/user.jpg';
const title = '정선 겨울 여행갔다왔어요.';
const reviewImages = ['/test1.png', '/test2.png', '/test3.png'];
const liked = false;
const likesCount = 10;
const travelLocation = '강원도 평창';
const travelTitle = '12월에 떠나는 겨울 여행';
const content =
  '정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.정선의 겨울은 너무 아름다웠어요!\n 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.정선의 겨울은 너무 아름다웠어요!\n 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.정선의 겨울은 너무 아름다웠어요!\n 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.\n 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.\n 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.\n 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다. 다시 가고 싶어요.';
const score = 5;
// const travelLocation = '강원도 정선';
const createdAt = '2024-04-01';

// props {nickname, profileImage, title, reviewImages, liked, content, score, travelLocation, createdAt }
const ReviewDetailContainer = () => {
  // const handleLike = () => {
  // 좋아요 api 호출
  // };

  return (
    <main className="mt-[60px] flex flex-col items-center xl:px-5">
      <h1 className="title-1-b mb-8 hidden w-full max-w-[1400px] text-label-normal xl:mt-10 xl:block">
        리뷰 상세
      </h1>

      <div className="flex w-full flex-col justify-start xl:max-w-[1400px] xl:flex-row xl:gap-5">
        <ReviewThumbnail reviewImages={reviewImages} />

        <section className="w-full px-5 md:px-10">
          <div className="flex h-[60px] w-full items-center justify-between border-b border-line-normal py-2.5">
            <div className="body-2-m flex items-center gap-2 text-label-neutral">
              <UserIcon
                nickname={nickname}
                profileImage={profileImage}
                size="xs"
              />
              <p className="body-2-m">{nickname}</p>
            </div>
            <button
              type="button"
              // onClick={handleLike}
            >
              <HeartIcon
                className={cn('fill-none', { 'fill-red-400': liked })}
              />
              <div className="caption-1-r text-red-400">{likesCount}</div>
            </button>
          </div>

          <ReviewContent
            title={title}
            content={content}
            travelLocation={travelLocation}
          />

          <div className="text-grey-500 body-2-m mt-4 flex w-full items-center justify-between xl:mt-2.5">
            <div className="flex items-center gap-1 text-label-alternative">
              <p>{createdAt}</p>
            </div>
            <div className="flex items-center gap-1">
              <StarIcon />
              <p>{score}</p>
            </div>
          </div>

          <section className="mt-6 flex h-[74px] w-full items-center justify-between rounded-md border bg-slate-50 px-5 py-4">
            <div>
              <p className="body-3-m text-label-alternative">다녀온 여행</p>
              <p className="heading-1-sb text-label-strong">{travelTitle}</p>
            </div>

            <div className="rounded-[44px] bg-label-normal px-3 py-1 text-primary-white">
              여행상세
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default ReviewDetailContainer;
