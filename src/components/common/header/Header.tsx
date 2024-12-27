'use client';

import { useRouter } from 'next/navigation';
import Back from '@/assets/back.svg';
import Setting from '@/assets/icon/setting_32px.svg';
import cn from '@/utils/cn';

interface Props {
  title: string;
  isConfigButton?: boolean;
  onRoute?: () => void;
}

const Header = ({ title, isConfigButton, onRoute }: Props) => {
  const router = useRouter();

  return (
    <header className="fixed top-0 z-10 flex h-[60px] w-full items-center border-b border-[#DADDE1] bg-white px-5 py-3.5 xl:hidden">
      <button
        type="button"
        onClick={() => {
          if (onRoute) {
            onRoute();
          } else {
            router.back();
          }
        }}
        aria-label="뒤로가기 버튼, 이전 페이지로 이동"
        className="z-10 m-0 cursor-pointer rounded border-none bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Back width={32} height={32} aria-hidden="true" />
      </button>

      <h1
        className={cn('flex-1 text-center text-lg font-semibold', {
          '-ml-8': !isConfigButton,
        })}
      >
        {title}
      </h1>

      {isConfigButton && (
        <button
          type="button"
          onClick={() => {
            router.push('/userSetting');
          }}
          className="text-sm text-gray-500"
        >
          <Setting width={32} height={32} aria-hidden="true" />
        </button>
      )}
    </header>
  );
};

export default Header;
