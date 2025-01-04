import LogoBlue from '@/assets/logo_blue.svg';
import MypageIcon from '@/assets/mypage.svg';
import useGetUser from '@/queries/user/useGetUser';
import Link from 'next/link';
import UserIcon from '../common/user/UserIcon';

const PCHeader = () => {
  const { data: user } = useGetUser();

  return (
    <header className="fixed top-0 z-30 h-auto w-full border-b border-line-neutral bg-white px-5 py-[14px] transition-all duration-300 ease-in-out md:px-10 xl:py-6">
      <span className="m-auto flex max-w-[1400px] items-center justify-between">
        <Link href="/" aria-label="WEGO 로고">
          <LogoBlue width={80} height={32} />
        </Link>
        <div className="title-5-sb flex items-center xl:gap-9">
          <div className="hidden xl:flex xl:gap-9">
            <Link href="/review">여행리뷰</Link>
            <Link href="/travel">여행찾기</Link>
            <Link href="/chat">채팅</Link>
          </div>
          {user ? (
            <Link href="/mypage">
              <UserIcon
                profileImage={user?.image}
                nickname={user.nickname}
                size="xxs"
                ariaLabel="마이페이지로 가기"
              />
            </Link>
          ) : (
            <Link href="/login">
              <MypageIcon
                width={24}
                height={24}
                aria-label="로그인하기"
                className="text-label-normal"
              />
            </Link>
          )}
        </div>
      </span>
    </header>
  );
};

export default PCHeader;
