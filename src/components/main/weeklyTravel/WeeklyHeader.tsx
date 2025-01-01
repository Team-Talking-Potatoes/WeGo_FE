import MoreButton from '@/components/common/button/MoreButton';
import { getWeekNumber } from '@/utils/dateChangeKr';
import dayjs from 'dayjs';

const WeeklyHeader = () => {
  const month = dayjs().month() + 1;
  const week = getWeekNumber();
  return (
    <header className="flex flex-col gap-1.5">
      <div className="flex justify-between">
        <h2 className="title-3-eb text-label-normal">이번주 인기 여행모임</h2>
        <MoreButton
          href="/travel"
          aria="이번주 인기 여행모임 페이지로 이동하기"
        />
      </div>
      <p className="body-2-m text-label-alternative">
        {month}월 {week}주차 조회수가 가장 많은 여행 모임을 알려드려요!
      </p>
    </header>
  );
};

export default WeeklyHeader;
