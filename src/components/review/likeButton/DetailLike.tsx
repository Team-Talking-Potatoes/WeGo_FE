'use client';

import cn from '@/utils/cn';
import HeartIcon from '@/assets/icon/review/heart_24px.svg';
import { useReviewLikes } from '@/queries/review/useReviewLikes';
import { useState } from 'react';

interface Props {
  reviewId: number;
  likesCount: number;
  likesFlag: boolean;
}

const DetailLike = ({ reviewId, likesCount, likesFlag }: Props) => {
  const [isLiked, setIsLiked] = useState(likesFlag);
  const [likesCountState, setLikesCountState] = useState(likesCount);
  const [animate, setAnimate] = useState(false);
  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCountState(isLiked ? likesCountState - 1 : likesCountState + 1);
  };
  const { mutate: handlePostLike } = useReviewLikes({
    id: reviewId,
    method: 'post',
    onSuccessCallback: toggleLike,
  });
  const { mutate: handleDeleteLike } = useReviewLikes({
    id: reviewId,
    method: 'delete',
    onSuccessCallback: toggleLike,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    if (isLiked) {
      handleDeleteLike();
    } else {
      handlePostLike();
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      <HeartIcon
        className={cn('fill-none', {
          'fill-primary-white': isLiked,
          'fill-red-400': isLiked,
          'animate-check-shake': animate && isLiked,
          'animate-check-shake-reverse': animate && !isLiked,
        })}
      />
      <div className="caption-1-r text-red-400">{likesCountState}</div>
    </button>
  );
};

export default DetailLike;
