import LogoBlue from '@/assets/logo_blue.svg';
import Write from '@/assets/write.svg';
import Mypage from '@/assets/mypage.svg';
import useGetUser from '@/queries/user/useGetUser';
import Link from 'next/link';
import UserIcon from '../common/user/UserIcon';

const PCHeader = () => {
  const { data: user } = useGetUser();

  return (
    <header className="fixed top-0 z-30 h-auto w-full border-b border-line-neutral bg-white px-5 py-[14px] transition-all duration-300 ease-in-out xl:py-6">
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
          <div className="flex gap-3 xl:gap-6">
            <Link href="/" aria-label="모임 만들기">
              <Write width={24} height={24} />
            </Link>
            <Link href="/mypage" aria-label="마이페이지로 가기">
              {user ? (
                <UserIcon
                  profileImage={user?.profileImage}
                  nickname={user.nickname}
                  size="xs"
                />
              ) : (
                <Mypage width={24} height={24} />
              )}
            </Link>
          </div>
        </div>
      </span>
    </header>
  );
};

export default PCHeader;
