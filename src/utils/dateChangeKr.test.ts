import dayjs from 'dayjs';
import {
  formatDateToShortWithDay,
  checkTomorrow,
  getWeekNumber,
} from './dateChangeKr';

describe('checkTomorrow', () => {
  it('내일 날짜는 "내일"을 반환해야 합니다.', () => {
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD'); // 내일 날짜
    expect(checkTomorrow(tomorrow)).toBe('내일'); // "내일"을 반환해야 함
  });

  it('지정일이 내일이 아니면 지정된 날짜를 반환해야 합니다', () => {
    const today = new Date();
    const notTomorrow = new Date();
    notTomorrow.setDate(today.getDate() + 5);
    notTomorrow.setHours(0, 0, 0, 0);
    const notTomorrowString = notTomorrow.toISOString().split('T')[0];
    expect(checkTomorrow(notTomorrowString)).toBe(notTomorrowString);
  });
});

describe('getWeekNumber', () => {
  it('오늘이 첫 번째 주인 경우 1을 반환해야 합니다.', () => {
    const today = dayjs().startOf('month');
    expect(getWeekNumber(today)).toBe(1);
  });

  it('오늘이 두 번째 주인 경우 2를 반환해야 합니다.', () => {
    const today = dayjs().startOf('month').add(7, 'day');
    expect(getWeekNumber(today)).toBe(2);
  });

  it('월초와 월말 케이스를 처리해야 합니다.', () => {
    const endOfMonth = dayjs('2024-12-31');
    expect(getWeekNumber(endOfMonth)).toBe(5);

    const startOfMonth = dayjs('2024-12-01');
    expect(getWeekNumber(startOfMonth)).toBe(1);
  });
});

describe('formatDateToShortWithDay', () => {
  it('2024.12.03를 12.03(화)로 변환합니다', () => {
    const dateString = '2024.12.03';
    expect(formatDateToShortWithDay(dateString)).toBe('12.03(화)');
  });

  it('2024.12.03에 offsetDays(3)를 더하면 12.06(금)으로 변환합니다', () => {
    const dateString = '2024.12.03';
    const offsetDays = 3;
    expect(formatDateToShortWithDay(dateString, offsetDays)).toBe('12.06(금)');
  });
});
