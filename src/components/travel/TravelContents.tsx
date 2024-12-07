import Image from 'next/image';
import Profile from '@/assets/profile.svg';
import Timeline from '@/assets/timeline.svg';
import DateIcon from '@/assets/date.svg';

import DomesticTag from '../common/tag/DomesticTag';
import RecruimentBox from './RecruimentBox';
import DateOverTag from '../common/tag/DateOverTag';

const TravelContents = () => {
  const endAt = '2024-12-08';
  const now = new Date();
  const endDate = new Date(endAt);

  const isDateOver = now > endDate;

  const info = 'flex items-center justify-center text-gray-500';
  return (
    <main>
      <figure className="relative flex h-[250px] w-full flex-col items-center justify-center overflow-hidden">
        <Image
          src="/test3.png"
          alt="이미지"
          layout="responsive"
          height={250}
          width={375}
          className="object-cover"
        />
        {now >= endDate && <DateOverTag endAt={endAt} />}
      </figure>
      <div className="flex flex-col px-5 pb-8 pt-6">
        <DomesticTag isDomestic />
        <h2 className="title-4-b pb-3 pt-1.5 font-bold">
          12월에 떠나는 겨울여행
        </h2>
        <div className="body-1-r pb-4">
          12월의 겨울 낭만을 즐기고 싶은 분들 계신가요?함께 국내 겨울 여행지를
          돌아다니고 싶습니다! 춥지만, 마음만은 따듯한 겨울 여행 함께해요
        </div>
        <div className="body-2-m flex flex-col gap-2">
          <div className={`${info} justify-start`}>
            <DateIcon />
            <span className="pl-2">2024.12.03 - 12.06</span>
          </div>

          <div className="flex gap-2 divide-x pb-5">
            <div className={`${info}`}>
              <Profile />
              <span className="pl-2 pr-1">모집정원</span>
              <span className="text-primary-normal">6명</span>
            </div>
            <div className={`${info} pl-2`}>
              <Timeline />
              <span className="pl-2 pr-1">모집기한</span>
              <span className="text-primary-normal">2024.11.31</span>
            </div>
          </div>
        </div>
        <RecruimentBox isDateOver={isDateOver} />
      </div>
    </main>
  );
};

export default TravelContents;
