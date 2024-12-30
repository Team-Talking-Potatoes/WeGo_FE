'use client';

import Right from '@/assets/icon/right_20px.svg';
import HorizontalDivider from '@/components/common/divider/HorizontalDivider';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
  description: string;
  destination?: string;
  handler?: () => void;
}

const SettingItem = ({ title, description, destination, handler }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (destination) {
      router.push(destination);
      return;
    }

    handler?.();
  };

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full max-w-[688px] justify-between py-4"
      >
        <div className="flex flex-col items-start">
          <div className="heading-1-sb text-label-normal">{title}</div>
          <div className="body-2-r text-label-alternative">{description}</div>
        </div>

        <div className="text-sm text-gray-500">
          <Right />
        </div>
      </button>

      <div className="flex justify-center">
        <HorizontalDivider
          className="max-w-[688px]"
          classNameCondition={{ hidden: title === '로그아웃' }}
        />
      </div>
    </li>
  );
};

export default SettingItem;
