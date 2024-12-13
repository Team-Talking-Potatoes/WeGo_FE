import ArrowIcon from '@/assets/arrow_down.svg';
// import DatePickerModal from '@/components/createTrip/datepicker/DatePickerModal';
// import useDatePicker from '@/hooks/useDatePicker';
// import { useTravelStore } from '@/store/useTravelStore';
// import { useState } from 'react';

const FilterDate = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const { startDate, endDate } = useTravelStore((state) => state.filters);
  // const setFilters = useTravelStore((state) => state.setFilters);

  // const isRangeSelectable = true;
  // const {
  //   currentDate,
  //   selectedStartDate,
  //   selectedEndDate,
  //   days,
  //   calendarEvents,
  //   inputEvents,
  // } = useDatePicker(
  //   { startDate, endDate },
  //   (value) => {
  //     setFilters(value);
  //   },
  //   isRangeSelectable,
  // );

  // const handleCloseCalendar = () => {
  //   inputEvents.cancelSelection();
  //   setIsModalOpen(false);
  // };

  // const handleConfirmCalendar = () => {
  //   inputEvents.confirmSelection();
  //   setIsModalOpen(false);
  // };

  // const handleYearMonthChange = (year: string, month: string) => {
  //   calendarEvents.adjustMonth(
  //     parseInt(month.replace('월', ''), 10) -
  //       1 -
  //       currentDate.getMonth() +
  //       (parseInt(year.replace('년', ''), 10) - currentDate.getFullYear()) * 12,
  //   );
  // };

  return (
    <div>
      <span className="flex items-center justify-between gap-1">
        날짜전체
        <ArrowIcon />
      </span>
      {/* <DatePickerModal
        currentDate={currentDate} // 현재날짜
        days={days} // 달력에 표시할 날짜 목록
        selectedStartDate={selectedStartDate} // 사용자 선택 날짜
        selectedEndDate={selectedEndDate}
        isOpen={isModalOpen} // 모달 오픈 여부
        calendarEvents={calendarEvents} //
        onYearMonthChange={handleYearMonthChange} // 연도, 월 변경 호출 콜백
        onClose={handleCloseCalendar} // 모달 닫기
        onConfirm={handleConfirmCalendar} // '선택'버튼 클릭 시 콜백
        isRangeSelectable={isRangeSelectable} // 날짜 범위 선택 여부
      /> */}
    </div>
  );
};

export default FilterDate;
