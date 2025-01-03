'use client';

import Link from 'next/link';
import LogoBlue from '@/assets/logo_blue.svg';
import LogoWhite from '@/assets/logo_white.svg';
import Mypage from '@/assets/mypage.svg';
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import useGetUser from '@/queries/user/useGetUser';
import UserIcon from '../common/user/UserIcon';

const HomeHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: user } = useGetUser();

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 280) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 300);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-30 ${isScrolled && 'bg-gradient-to-b from-transparent to-white backdrop-blur-lg'} h-auto w-full px-5 py-[14px] transition-all duration-300 ease-in-out md:px-10 xl:py-6`}
    >
      <span className="m-auto flex max-w-[1400px] items-center justify-between">
        <Link href="/">
          {isScrolled ? (
            <LogoBlue width={80} height={32} aria-label="WEGO 로고" />
          ) : (
            <LogoWhite width={80} height={32} aria-label="WEGO 로고" />
          )}
        </Link>
        <div className="title-5-sb flex items-center xl:gap-9">
          <div className="hidden xl:flex xl:gap-9">
            <Link
              href="/review"
              className={
                isScrolled ? 'text-label-normal' : 'text-primary-white'
              }
            >
              여행리뷰
            </Link>
            <Link
              href="/travel"
              className={
                isScrolled ? 'text-label-normal' : 'text-primary-white'
              }
            >
              여행찾기
            </Link>
            <Link
              href="/chat"
              className={
                isScrolled ? 'text-label-normal' : 'text-primary-white'
              }
            >
              채팅
            </Link>
          </div>

          {user ? (
            <Link href="/mypage">
              <UserIcon
                profileImage={user?.profileImage}
                nickname={user?.nickname}
                ariaLabel="마이페이지로 가기"
                size="xs"
              />
            </Link>
          ) : (
            <Link href="/login">
              <Mypage
                width={24}
                height={24}
                aria-label="로그인하기"
                className={
                  isScrolled ? 'text-label-normal' : 'text-primary-white'
                }
              />
            </Link>
          )}
        </div>
      </span>
    </header>
  );
};
export default HomeHeader;
