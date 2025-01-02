'use client';

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';
import Close from '@/assets/close_20px.svg';
import { Button } from '@/components/common/button/Button';
import { useState } from 'react';
import TimePickerSlider from './TimePickerSlider';

type Picker = Omit<Parameters<typeof TimePickerSlider>[0], 'onSlide'> & {
  selectedIndex: number;
};

interface Props {
  title?: string;
  firstPicker: Picker;
  secondPicker: Picker;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (firstTime: string, secondTime: string) => void;
  isValid?: (firstTime: string, secondTime: string) => boolean;
}

const TimePicker = ({
  title,
  firstPicker,
  secondPicker,
  isOpen,
  onClose,
  onSelect,
  isValid,
}: Props) => {
  const [firstTime, setFirstTime] = useState('');
  const [secondTime, setSecondTime] = useState('');

  const handlePickerButton = () => {
    if (isValid && !isValid(firstTime, secondTime)) {
      return; // 유효하지 않은 경우 버튼 동작 중단
    }

    onSelect(firstTime, secondTime); // 유효한 경우 선택된 값 전달
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-label-strong/40"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-end justify-center xl:items-center">
        <DialogPanel
          className="w-full rounded-t-lg bg-background-normal pb-10 pt-8 xl:max-w-[320px] xl:rounded-lg xl:py-4 xl:shadow-lg xl:shadow-black/20 xl:drop-shadow-[0px_7px_26px_rgba(0,0,0,0.2)]"
          aria-labelledby="timePickerTitle"
          aria-modal="true"
        >
          <div className="mx-auto mb-8 flex w-[335px] items-center justify-between xl:w-[288px]">
            <DialogTitle id="timePickerTitle" className="title-4-b">
              {title ?? '시간 설정'}
            </DialogTitle>
            <button type="button" onClick={onClose} aria-label="시간 설정 닫기">
              <Close />
            </button>
          </div>
          <div className="mx-auto flex w-[335px] gap-x-4 xl:w-[288px]">
            <TimePickerSlider
              timeList={firstPicker.timeList}
              isLoop={firstPicker.isLoop}
              selectedIndex={firstPicker.selectedIndex}
              onSlide={(time: string) => setFirstTime(time)}
            />
            <TimePickerSlider
              timeList={secondPicker.timeList}
              isLoop={secondPicker.isLoop}
              selectedIndex={secondPicker.selectedIndex}
              onSlide={(time: string) => setSecondTime(time)}
            />
          </div>
          <div className="mx-auto w-[335px] xl:w-[288px]">
            <Button
              handler={handlePickerButton}
              className="mt-10 xl:w-[288px]"
              disabled={isValid && !isValid(firstTime, secondTime)}
            >
              선택
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TimePicker;
