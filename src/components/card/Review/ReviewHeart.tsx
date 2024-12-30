import HeartIcon from '@/assets/icon/review/heart_18px.svg';
import cn from '@/utils/cn';

interface Props {
  isLiked?: boolean;
  animate: boolean;
  handler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  red?: boolean;
}

const ReviewHeart = ({ isLiked, animate, handler, red }: Props) => {
  // 백엔드쪽 좋아요 기능 구현 후 대체 예정
  // --------------------------

  return (
    <button
      type="button"
      onClick={handler}
      className="group/button absolute right-2 top-2 z-[15] flex h-9 w-9 items-center justify-center rounded bg-black/30 hover:bg-black/50"
    >
      <HeartIcon
        data-testid="heart-icon"
        className={cn(
          'forwards fill-none transition-all duration-200 group-hover/button:scale-105',
          {
            'stroke-primary-white': !red,
            'fill-primary-white': !red && isLiked,
            'stroke-red-400': red,
            'fill-red-400': red && isLiked,
            'animate-check-shake': animate && isLiked,
            'animate-check-shake-reverse': animate && !isLiked,
          },
        )}
      />
    </button>
  );
};

export default ReviewHeart;
