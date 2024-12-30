import ButtonRounded from '@/components/common/button/ButtonRounded';
import Link from 'next/link';

const ReviewHeader = () => {
  return (
    <header className="mb-6 flex items-center justify-between pt-10">
      <div className="title-2-b text-label-normal">여행 리뷰</div>
      <Link href="/review/new" aria-label="리뷰 작성 버튼">
        <ButtonRounded label="리뷰작성" />
      </Link>
    </header>
  );
};

export default ReviewHeader;
