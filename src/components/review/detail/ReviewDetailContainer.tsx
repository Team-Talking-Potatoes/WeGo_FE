import StarIcon from '@/assets/icon/star_20px.svg';
import UserIcon from '@/components/common/user/UserIcon';
import { Review } from '@/@types/review';
import Link from 'next/link';
import { formatDateToShortWithDay } from '@/utils/dateChangeKr';
import ReviewThumbnail from './reviewThumbnail/ReviewThumbnail';
import ReviewContent from './reviewContent/ReviewContent';
import DetailLike from '../likeButton/DetailLike';

interface Props {
  data: Partial<Review>;
}

const ReviewDetailContainer = ({ data }: Props) => {
  return (
    <main className="mt-[60px] flex flex-col items-center xl:px-5">
      <h1 className="title-1-b mb-8 hidden w-full max-w-[1400px] text-label-normal xl:mt-10 xl:block">
        리뷰 상세
      </h1>

      <div className="flex w-full flex-col justify-start xl:max-w-[1400px] xl:flex-row xl:gap-5">
        <ReviewThumbnail reviewImages={data?.reviewImages || []} />

        <section className="w-full px-5 md:px-10">
          <div className="flex h-[60px] w-full items-center justify-between border-b border-line-normal py-2.5">
            <div className="body-2-m flex items-center gap-2 text-label-neutral">
              <UserIcon
                nickname={data?.nickname || ''}
                profileImage={data?.profileImage || ''}
                size="xs"
              />
              <p className="body-2-m">{data?.nickname}</p>
            </div>

            <DetailLike
              reviewId={data?.reviewId as number}
              likesCount={data?.likesCount as number}
              likesFlag={data?.likesFlag as boolean}
            />
          </div>

          <ReviewContent
            title={data?.title || ''}
            content={data?.content || ''}
            travelLocation={data?.travelLocation || ''}
          />

          <div className="text-grey-500 body-2-m mt-4 flex w-full items-center justify-between xl:mt-2.5">
            <div className="flex items-center gap-1 text-label-alternative">
              <p>{formatDateToShortWithDay(data?.createdAt)}</p>
            </div>
            <div className="flex items-center gap-1">
              <StarIcon />
              <p>{data?.starRating}</p>
            </div>
          </div>

          <Link
            href={`/travel/${data?.travelId}`}
            className="group mt-6 flex h-[74px] w-full items-center justify-between rounded-md border bg-slate-50 px-5 py-4 hover:bg-slate-100"
          >
            <div>
              <p className="body-3-m text-label-alternative">다녀온 여행</p>
              <p className="heading-1-sb text-label-strong">
                {data?.travelTitle}
              </p>
            </div>

            <div className="rounded-[44px] bg-label-normal px-3 py-1 text-primary-white group-hover:bg-primary-normal">
              여행상세
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default ReviewDetailContainer;
