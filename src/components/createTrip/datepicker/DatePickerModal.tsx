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
  calendarInfo: CalendarInfo;
  isInitBtn?: boolean;
}

const DatePickerModal = ({ calendarInfo, isInitBtn = false }: Props) => {
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
      <div className="fixed inset-0 flex w-screen items-end justify-center">
        <DialogPanel
          ref={modalRef}
          className="rounded-t-lg bg-background-normal px-5 pb-10 pt-8"
          aria-labelledby="datePickerTitle"
          aria-modal="true"
        >
          <DatePickerHeader
            currentDate={currentDate}
            onMonthChange={calendarEvents.adjustMonth}
            onYearMonthChange={handleYearMonthChange}
            onClose={closeCalendar}
          />
          <DatePickerDays
            days={days}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            calendarEvents={calendarEvents}
            isRangeSelectable={isRangeSelectable}
          />
          <div className="flex justify-between">
            {isInitBtn && (
              <Button
                handler={initCalendar}
                className="mt-10"
                disabled={!selectedStartDate}
                size="half"
                fill="white"
              >
                초기화
              </Button>
            )}
            <Button
              handler={confirmCalendar}
              className="mt-10"
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
