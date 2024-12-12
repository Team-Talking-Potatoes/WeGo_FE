import ButtonRounded from '@/components/common/button/ButtonRounded';
import Link from 'next/link';

const TravelHeader = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="title-2-b text-label-normal">여행 찾기</div>
      <Link href="/" aria-label="여행 만들기 버튼">
        <ButtonRounded label="여행 만들기" />
      </Link>
    </header>
  );
};

export default TravelHeader;
