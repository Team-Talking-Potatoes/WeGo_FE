import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// 현재 날짜를 기준으로 '내일'을 계산
export const checkTomorrow = (checkDate: string): string => {
  const inputDate = dayjs(checkDate).startOf('day');
  const tomorrow = dayjs().add(1, 'day').startOf('day');

  if (inputDate.isSame(tomorrow, 'day')) {
    return '내일';
  }

  return checkDate;
};

// 현재 날짜를 기준으로 'n주차' 계산
export const getWeekNumber = (dateFrom = dayjs()) => {
  const currentDate = dateFrom.date();
  const startOfMonth = dateFrom.startOf('month');
  const weekDay = startOfMonth.day();
  const offset = weekDay === 0 ? 0 : 7 - weekDay;
  return Math.floor((offset + currentDate) / 7) + 1;
};

/**
 * @param dateString 변환하려는 날짜(20241203)
 * @param offsetDays dateString을 기준으로 더하고 싶은 숫자
 * @param includeYear 연도 포함 여부
 * @return 2024.12.03(화) 혹은 12.03(화)
 */
export const formatDateToShortWithDay = (
  dateString: string,
  offsetDays?: number,
  includeYear: boolean = true,
): string => {
  let date = dayjs(dateString, 'YYYYMMDD').locale('ko');

  if (offsetDays) {
    date = date.add(offsetDays, 'day');
  }
  const dayName = date.format('ddd');

  return includeYear
    ? date.format(`YYYY.MM.DD(${dayName})`)
    : date.format(`MM.DD(${dayName})`);
};
