import ButtonRounded from '@/components/common/button/ButtonRounded';
import Link from 'next/link';

const ReviewHeader = () => {
  return (
    <header className="mb-6 flex items-center justify-between pt-9">
      <div className="title-2-b text-label-normal">여행 리뷰</div>
      <Link href="/travel/new" aria-label="여행 만들기 버튼">
        <ButtonRounded label="리뷰작성" />
      </Link>
    </header>
  );
};

export default ReviewHeader;
