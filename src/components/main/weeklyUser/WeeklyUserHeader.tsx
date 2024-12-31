import dayjs from 'dayjs';

const WeeklyUserHeader = () => {
  const currentMonth = dayjs().month() + 1;
  return (
    <>
      <h2 className="title-3-eb text-label-normal">
        {currentMonth}월의 여행지기
      </h2>

      <p className="body-2-m pb-6 pt-1 text-label-alternative">
        이번 달 리뷰가 많은 여행지기들을 소개해 드려요!
      </p>
    </>
  );
};

export default WeeklyUserHeader;
