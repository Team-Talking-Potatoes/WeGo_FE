'use client';

import useDatePicker from '@/hooks/useDatePicker';
import { TextInputWithLabel } from '@/components/inputwithlabel/TextInputWithLabel';
import { formatDate } from '@/utils/calendarHelper';
import Calendar from '@/assets/calendar.svg';
import DatePickerModal from './DatePickerModal';

interface Props {
  registrationEnd?: Date;
  value: { startDate: Date | null; endDate: Date | null };
  onChange: (value: { startDate: Date | null; endDate: Date | null }) => void;
  isRangeSelectable: boolean;
  isKeeping: boolean;
  label: string;
}

const DatePicker = ({
  value,
  onChange,
  isRangeSelectable,
  isKeeping,
  label,
  registrationEnd,
}: Props) => {
  const calendarInfo = useDatePicker(
    value,
    onChange,
    isRangeSelectable,
    isKeeping,
  );
  const { startDate, endDate } = value;
  const today = new Date();

  const getFormattedDate = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    if (startDate) {
      return formatDate(startDate);
    }
    return '';
  };

  return (
    <div className="relative">
      <TextInputWithLabel
        label={label}
        state="required"
        name="selectedDate"
        type="text"
        size="full"
        value={getFormattedDate()}
        placeholder={formatDate(today)}
        readOnly
        onClick={calendarInfo.openCalendar}
        onChange={() => {}}
      >
        <Calendar />
      </TextInputWithLabel>
      <DatePickerModal
        calendarInfo={calendarInfo}
        registrationEnd={registrationEnd}
      />
    </div>
  );
};

export default DatePicker;
