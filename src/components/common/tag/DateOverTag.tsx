import dayjs from 'dayjs';

const DateOverTag = ({ endAt }: { endAt: string }) => {
  const now = dayjs().startOf('day');
  const endDate = dayjs(endAt.replace(/\./g, '-')).startOf('day');
  const tagCss =
    'body-3-sb absolute left-0 top-0 h-8 w-[69px] text-primary-white flex items-center justify-center';
  if (now.isSame(endDate, 'day')) {
    return <div className={`${tagCss} bg-primary-normal`}>오늘 마감</div>;
  }
  if (now.isAfter(endDate, 'day')) {
    return <div className={`${tagCss} bg-label-normal`}>마감</div>;
  }
  return null;
};
export default DateOverTag;
