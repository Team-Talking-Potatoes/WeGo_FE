import HeartIcon from '@/assets/icon/review/heart_18px.svg';
import { useReviewLikes } from '@/queries/review/useReviewLikes';
import cn from '@/utils/cn';
import { useState } from 'react';

interface Props {
  reviewId: number;
  isLiked?: boolean;
  setIsLiked: (isLiked: boolean) => void;
}

const ReviewHeart = ({ reviewId, isLiked, setIsLiked }: Props) => {
  const [animate, setAnimate] = useState(false);
  const toggleLike = () => {
    setIsLiked(!isLiked);
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
    <button
      type="button"
      onClick={handleClick}
      className="group/button absolute right-2 top-2 z-[15] flex h-9 w-9 items-center justify-center rounded bg-black/30 hover:bg-black/50"
    >
      <HeartIcon
        data-testid="heart-icon"
        className={cn(
          'forwards fill-none stroke-primary-white transition-all duration-200 group-hover/button:scale-105',
          {
            'fill-primary-white': isLiked,
            'animate-check-shake': animate && isLiked,
            'animate-check-shake-reverse': animate && !isLiked,
          },
        )}
      />
    </button>
  );
};

export default ReviewHeart;
