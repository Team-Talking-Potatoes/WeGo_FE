'use client';

import Link from 'next/link';
import LogoBlue from '@/assets/logo_blue.svg';
import Mypage from '@/assets/mypage.svg';
import Write from '@/assets/write.svg';
import useGetUser from '@/queries/user/useGetUser';
import { usePathname } from 'next/navigation';
import UserIcon from '../common/user/UserIcon';

const MobileHeader = () => {
  const pathname = usePathname();
  const { data: user } = useGetUser();

  if (pathname === '/travel' || pathname === '/review') {
    return (
      <header className="fixed z-30 flex h-auto w-full items-center justify-between border-b border-line-neutral bg-white px-5 py-[14px] md:px-10">
        <Link href="/">
          <LogoBlue width={80} height={32} aria-label="WEGO 로고" />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/travel/new">
            <Write
              width={24}
              height={24}
              className="text-label-normal"
              aria-label="모임 만들기"
            />
          </Link>
          <Link href="/mypage">
            {user ? (
              <UserIcon
                profileImage={user?.profileImage}
                nickname={user.nickname}
                size="xs"
                ariaLabel="마이페이지로 가기"
              />
            ) : (
              <Mypage
                width={24}
                height={24}
                aria-label="로그인하기"
                className="text-label-normal"
              />
            )}
          </Link>
        </div>
      </header>
    );
  }
  return null;
};

export default MobileHeader;
