import ButtonRounded from '@/components/common/button/ButtonRounded';
import Link from 'next/link';
import FilterSearch from './FilterSearch';

const TravelHeader = () => {
  return (
    <header className="grid w-full grid-cols-2 gap-6 pb-4 pt-9 lg:grid-cols-[132px_minmax(600px,_1fr)_100px] lg:pb-8">
      <div className="title-2-b order-1 text-label-normal lg:order-1 lg:col-span-1">
        여행 찾기
      </div>
      <Link
        href="/travel/new"
        aria-label="여행 만들기 버튼"
        className="order-2 flex h-[30px] w-full flex-shrink-0 items-end justify-end lg:order-3"
      >
        <ButtonRounded label="여행 만들기" className="inline-block" />
      </Link>
      <FilterSearch />
    </header>
  );
};

export default TravelHeader;
