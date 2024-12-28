import Link from 'next/link';
import Image from 'next/image';
import { Review } from '@/@types/review';

type Props = Pick<Review, 'reviewId' | 'nickname' | 'reviewImage'>;

const MainReviewCard = ({ reviewId, nickname, reviewImage }: Props) => {
  return (
    <article>
      <div className="h-[272px] w-[180px] md:h-[260px] md:w-[200px]">
        <Link href={`/${reviewId}`}>
          <Image
            src={reviewImage}
            width={180}
            height={240}
            className="h-full w-full rounded object-cover"
            alt={`${nickname}의 여행 후기 사진`}
          />
        </Link>
      </div>
      <Link href="/">
        <div className="inline-block pt-[10px] text-status-infomative">
          {nickname}
        </div>
      </Link>
    </article>
  );
};
export default MainReviewCard;
