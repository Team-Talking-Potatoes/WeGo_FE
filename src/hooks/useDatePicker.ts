import { useState } from 'react';
import { getDaysInMonth } from '@/utils/calendarHelper';

const useDatePicker = (
  value: {
    startDate: Date | null;
    endDate: Date | null;
  },
  onChange: (value: { startDate: Date | null; endDate: Date | null }) => void,
  isRangeSelectable: boolean,
  isKeeping: boolean,
) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 선택된 연/월을 위한 상태
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { startDate, endDate } = value;

  const today = new Date();
  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const calendarEvents = {
    selectDate: (date: Date) => {
      if (isRangeSelectable) {
        if (!selectedStartDate || (selectedEndDate && !isDragging)) {
          setSelectedStartDate(date);
          setSelectedEndDate(null);
        } else if (selectedStartDate.getTime() === date.getTime()) {
          setSelectedStartDate(null);
        } else if (!selectedEndDate) {
          setSelectedStartDate(
            selectedStartDate.getTime() < date.getTime()
              ? selectedStartDate
              : date,
          );
          setSelectedEndDate(
            selectedStartDate.getTime() < date.getTime()
              ? date
              : selectedStartDate,
          );
        }
      } else {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      }
    },

    startDrag: (date: Date) => {
      if (isRangeSelectable) {
        setIsDragging(true);
        setDragStart(date);
      }
    },

    extendSelection: (date: Date) => {
      if (isRangeSelectable && isDragging && dragStart) {
        setSelectedStartDate(dragStart < date ? dragStart : date);
        setSelectedEndDate(dragStart > date ? dragStart : date);
      }
    },

    endDrag: () => {
      if (isRangeSelectable) {
        setIsDragging(false);
        setDragStart(null);
      }
    },

    adjustMonth: (offset: number) => {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + offset,
        1,
      );

      const isFutureDate =
        newDate.getFullYear() > today.getFullYear() ||
        (newDate.getFullYear() === today.getFullYear() &&
          newDate.getMonth() >= today.getMonth());

      if (isFutureDate) {
        setCurrentDate(newDate);
      }
    },
  };

  const inputEvents = {
    openCalendar: () => {
      if (startDate) {
        setCurrentDate(
          new Date(startDate.getFullYear(), startDate.getMonth(), 1),
        );
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
      } else {
        setCurrentDate(new Date());
        setSelectedStartDate(null);
        setSelectedEndDate(null);
      }
    },

    confirmSelection: () => {
      onChange({
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      });
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setCurrentDate(new Date());
    },

    cancelSelection: () => {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setCurrentDate(new Date());
    },

    initSelection: () => {
      onChange({
        startDate: null,
        endDate: null,
      });
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setCurrentDate(new Date());
    },
  };

  const openCalendar = () => {
    if (isKeeping) inputEvents.openCalendar();
    setIsOpen(true);
  };

  const closeCalendar = () => {
    inputEvents.cancelSelection();
    setIsOpen(false);
  };

  const confirmCalendar = () => {
    inputEvents.confirmSelection();
    setIsOpen(false);
  };

  const initCalendar = () => {
    inputEvents.initSelection();
  };

  const calendarInfo = {
    currentDate,
    selectedStartDate,
    selectedEndDate,
    days,
    calendarEvents,
    isOpen,
    isRangeSelectable,
    openCalendar,
    closeCalendar,
    confirmCalendar,
    initCalendar,
  };

  return calendarInfo;
};

export default useDatePicker;
