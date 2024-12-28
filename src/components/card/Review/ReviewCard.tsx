import Link from 'next/link';
import Image from 'next/image';
import LocationIcon from '@/assets/icon/location_18px.svg';
import StarIcon from '@/assets/icon/star_20px.svg';
import UserIcon from '@/components/common/user/UserIcon';
import { useState } from 'react';
import ReviewHeart from './ReviewHeart';

interface Props {
  reviewId: number;
  nickname?: string;
  profileImage?: string;
  image: string;
  title: string;
  content: string;
  score: number;
  travelLocation: string;
  createdAt: string;
  isLiked?: boolean;
}

const ReviewCard = ({
  reviewId,
  nickname,
  profileImage,
  image,
  title,
  content,
  score,
  travelLocation,
  createdAt,
  isLiked,
}: Props) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [animate, setAnimate] = useState(false);

  const handleClickLikeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    // if (!isLikedState) {
    //   postReviewBookMark(reviewId);
    // } else {
    //   deleteReviewBookMark(reviewId);
    // }

    setIsLikedState(!isLikedState);
  };

  return (
    <Link href={`/review/${reviewId}`} className="min-w-[160px] flex-1">
      <div className="relative h-[242px] w-full md:h-[315px]">
        <div className="relative">
          <Image
            src={image}
            alt={title}
            width={160}
            height={210}
            className="h-[210px] w-full rounded object-cover md:h-[283px]"
          />

          {isLiked !== undefined && (
            <ReviewHeart
              isLiked={isLikedState}
              animate={animate}
              handler={handleClickLikeButton}
            />
          )}

          <div className="group absolute bottom-0 z-10 flex h-full w-full flex-col justify-end gap-0.5 px-3 pb-3 text-primary-white">
            <div className="absolute bottom-0 left-0 z-20 h-[80px] w-full bg-gradient-to-b from-black/0 to-black/80 transition-all duration-200 ease-in-out group-hover:h-full group-hover:bg-black/60" />
            <p className="body-3-m z-20 line-clamp-1 group-hover:opacity-0">
              {title}
            </p>
            <p className="body-3-m z-10 line-clamp-5 h-0 max-h-[90px] translate-y-full overflow-hidden transition-all duration-200 ease-in-out group-hover:z-20 group-hover:h-auto group-hover:translate-y-0">
              {content}
            </p>
            <p className="caption-1-r z-20 text-label-assistive">{createdAt}</p>
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
            <p className="body-3-m text-label-alternative">{score}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
