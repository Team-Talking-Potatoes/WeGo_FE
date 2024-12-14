'use client';

import React, { useState } from 'react';
import DatePickerModal from '@/components/createTrip/datepicker/DatePickerModal';
import useDatePicker from '@/hooks/useDatePicker';
import { DateRange } from '@/@types/travelForm';
import { formatDateToString } from '@/utils/calendarHelper';

const Page = () => {
  const [data1, setDate1] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [data2, setDate2] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const calendarInfo1 = useDatePicker(data1, setDate1, false, false);
  const calendarInfo2 = useDatePicker(data2, setDate2, true, true);

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center">
      <h1>
        주의사항: 실제 사용하는 상태값과 모달에 날짜 표시하는 상태값은 별개의 값
      </h1>
      <div className="flex flex-col items-center justify-center bg-blue-300 p-10">
        <ul>
          <li className="title-3-eb">
            useDatePicker 인자 설명 및 isInitBtn prop 설명
          </li>
          <li>3번째 인자 false: 하나의 날짜만 선택 가능</li>
          <li>
            4번째 인자 false: 모달 오픈했을 경우 캘린더에 이전 선택 유지되지
            않음
          </li>
          <li>isInitBtn prop false(디폴트 값): 선택 버튼 하나 존재</li>
        </ul>

        <button
          type="button"
          onClick={calendarInfo1.openCalendar}
          className="rounded bg-white p-5"
        >
          달력1 오픈 버튼
        </button>
        <div>시작일: {formatDateToString(data1.startDate)}</div>
        <DatePickerModal calendarInfo={calendarInfo1} />
      </div>
      <div className="flex flex-col items-center justify-center bg-red-300 p-10">
        <ul>
          <li className="title-3-eb">
            useDatePicker 인자 설명 및 isInitBtn prop 설명
          </li>
          <li>3번째 인자 true: 날짜 범위 선택 가능</li>
          <li>4번째 인자 true: 모달 오픈했을 경우 캘린더에 이전 선택 유지</li>
          <li>
            isInitBtn prop true: 초기화, 적용 버튼 존재 (적용 버튼은 선택 버튼과
            동작 동일)
          </li>
        </ul>
        <button
          type="button"
          onClick={calendarInfo2.openCalendar}
          className="rounded bg-black p-5 text-white"
        >
          달력2 오픈 버튼
        </button>
        <div>시작일: {formatDateToString(data2.startDate)}</div>
        <div>종료일: {formatDateToString(data2.endDate)}</div>
        <DatePickerModal calendarInfo={calendarInfo2} isInitBtn />
      </div>
    </div>
  );
};

export default Page;
