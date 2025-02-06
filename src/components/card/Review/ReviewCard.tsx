import Link from 'next/link';
import Image from 'next/image';
import LocationIcon from '@/assets/icon/location_18px.svg';
import StarIcon from '@/assets/icon/star_20px.svg';
import UserIcon from '@/components/common/user/UserIcon';
import { useState } from 'react';
import { formatDateToShortWithDay } from '@/utils/dateChangeKr';
import { Review } from '@/@types/review';
import ReviewHeart from './ReviewHeart';

type Props = Partial<Review>;

const ReviewCard = ({
  reviewId,
  nickname,
  profileImage,
  reviewImage,
  title,
  content,
  starRating,
  travelLocation,
  createdAt,
  likesFlag,
}: Props) => {
  const [isLikedState, setIsLikedState] = useState(likesFlag);

  return (
    <Link
      href={`/review/${reviewId}`}
      className="min-w-[160px] flex-1 xl:max-w-[332px]"
    >
      <div className="relative aspect-[160/210] w-full">
        <div className="relative h-full">
          <Image
            src={reviewImage ?? ''}
            alt={title ?? ''}
            fill
            className="rounded object-cover opacity-0 duration-300 ease-in-out"
            onLoadingComplete={(img) => {
              img.classList.remove('opacity-0');
              img.classList.add('opacity-100');
            }}
          />

          {likesFlag !== undefined && (
            <ReviewHeart
              reviewId={reviewId!}
              isLiked={isLikedState}
              setIsLiked={setIsLikedState}
            />
          )}

          <div className="group absolute bottom-0 z-10 flex h-full w-full flex-col justify-end gap-0.5 px-3 pb-3 text-primary-white">
            <div className="absolute bottom-0 left-0 z-20 h-[80px] w-full bg-gradient-to-b from-black/0 to-black/80 transition-all duration-200 ease-in-out group-hover:h-full group-hover:bg-black/60" />
            <p className="body-3-m z-20 line-clamp-1 md:body-1-m group-hover:opacity-0">
              {title}
            </p>
            <p className="body-3-m z-10 line-clamp-5 h-0 max-h-[90px] translate-y-full overflow-hidden transition-all duration-200 ease-in-out md:body-1-m group-hover:z-20 group-hover:h-auto group-hover:translate-y-0 md:max-h-full">
              {content}
            </p>
            <p className="caption-1-r z-20 text-label-assistive md:body-2-r">
              {formatDateToShortWithDay(createdAt, 0, false, false)}
            </p>
          </div>
        </div>

        <div className="mt-3 flex justify-between">
          {nickname ? (
            <div className="flex items-center gap-2">
              <UserIcon size="xs" profileImage={profileImage} />
              <p className="body-3-m">{nickname}</p>
            </div>
          ) : (
            <div className="flex">
              <LocationIcon />
              <p className="text-grey-900 body-2-m">{travelLocation}</p>
            </div>
          )}

          <div className="flex items-center">
            <StarIcon />
            <p className="body-3-m text-label-alternative">{starRating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
