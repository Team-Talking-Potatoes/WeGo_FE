'use client';

import { useRef } from 'react';
import { CalendarEvents, Day } from '@/@types/date';
import { Button } from '@/components/common/button/Button';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import DatePickerHeader from './DatePickerHeader';
import DatePickerDays from './DatePickerDays';

interface CalendarInfo {
  currentDate: Date;
  days: Day[];
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  calendarEvents: CalendarEvents;
  isOpen: boolean;
  isRangeSelectable: boolean;
  openCalendar: () => void;
  closeCalendar: () => void;
  confirmCalendar: () => void;
  initCalendar: () => void;
}
interface Props {
  registrationEnd?: Date;
  calendarInfo: CalendarInfo;
  isInitBtn?: boolean;
}

const DatePickerModal = ({
  calendarInfo,
  isInitBtn = false,
  registrationEnd,
}: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const {
    currentDate,
    selectedStartDate,
    selectedEndDate,
    days,
    calendarEvents,
    isOpen,
    isRangeSelectable,
    closeCalendar,
    confirmCalendar,
    initCalendar,
  } = calendarInfo;

  const handleYearMonthChange = (year: string, month: string) => {
    calendarEvents.adjustMonth(
      parseInt(month.replace('월', ''), 10) -
        1 -
        currentDate.getMonth() +
        (parseInt(year.replace('년', ''), 10) - currentDate.getFullYear()) * 12,
    );
  };

  return (
    <Dialog open={isOpen} onClose={closeCalendar} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-label-strong/40"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-end justify-center xl:items-center">
        <DialogPanel
          ref={modalRef}
          className="w-full rounded-t-lg bg-background-normal pb-10 pt-8 xl:max-w-[320px] xl:rounded-lg xl:py-4 xl:shadow-lg xl:shadow-black/20 xl:drop-shadow-[0px_7px_26px_rgba(0,0,0,0.2)]"
          aria-labelledby="datePickerTitle"
          aria-modal="true"
        >
          <DatePickerHeader
            registrationEnd={registrationEnd}
            currentDate={currentDate}
            onMonthChange={calendarEvents.adjustMonth}
            onYearMonthChange={handleYearMonthChange}
            onClose={closeCalendar}
          />
          <DatePickerDays
            registrationEnd={registrationEnd}
            days={days}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            calendarEvents={calendarEvents}
            isRangeSelectable={isRangeSelectable}
          />
          <div className="mx-auto flex w-[335px] justify-between xl:w-[300px]">
            {isInitBtn && (
              <Button
                handler={initCalendar}
                className="mt-10 xl:mt-6 xl:w-[145px]"
                disabled={!selectedStartDate}
                size="half"
                fill="white"
              >
                초기화
              </Button>
            )}
            <Button
              handler={confirmCalendar}
              className={`mt-10 xl:mt-6 ${isInitBtn && 'xl:w-[145px]'}`}
              disabled={!selectedStartDate}
              size={isInitBtn ? 'half' : 'default'}
            >
              {isInitBtn ? '적용' : '선택'}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DatePickerModal;
