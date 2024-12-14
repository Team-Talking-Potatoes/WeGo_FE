// 현재 날짜를 기준으로 '내일'을 계산
export const formatStartDate = (startDate: string): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [month, day] = startDate.split('.');
  const startDateObj = new Date(
    today.getFullYear(),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
  );

  if (
    startDateObj.getDate() === tomorrow.getDate() &&
    startDateObj.getMonth() === tomorrow.getMonth() &&
    startDateObj.getFullYear() === tomorrow.getFullYear()
  ) {
    return '내일';
  }
  return startDate;
};

// 현재 날짜를 기준으로 'n주차' 계산
export const getWeekNumber = (dateFrom = new Date()) => {
  const currentDate = dateFrom.getDate();
  const startofMonth = new Date(dateFrom);
  startofMonth.setDate(1);
  const weekDay = startofMonth.getDay();
  const offset = weekDay === 0 ? 0 : 7 - weekDay;
  return Math.floor((offset + currentDate) / 7) + 1;
};

/**
 * @param dateString 변환하려는 날짜(2024.12.03)
 * @param offsetDays dateString을 기준으로 더하고 싶은 숫자
 * @param includeYear 연도 포함 여부
 * @return 2024.12.03(화) 혹은 12.03(화)
 */
export const formatDateToShortWithDay = (
  dateString: string,
  offsetDays?: number,
  includeYear?: boolean,
): string => {
  const date = new Date(dateString);
  if (offsetDays) {
    date.setDate(date.getDate() + offsetDays);
  }
  const option: Intl.DateTimeFormatOptions = { weekday: 'short' };
  const dayName = new Intl.DateTimeFormat('ko-KR', option).format(date);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return includeYear
    ? `${year}.${month}.${day}(${dayName})`
    : `${month}.${day}(${dayName})`;
};
