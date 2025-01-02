import ButtonRounded from '@/components/common/button/ButtonRounded';
import Skeleton from '@/components/common/skeleton/Skeleton';
import Link from 'next/link';
import Setting from '@/assets/icon/setting_32px.svg';

const ProfileSkeleton = () => {
  return (
    <div className="relative mx-auto mb-8 max-w-[335px] md:max-w-[688px] xl:mb-[60px] xl:max-w-[1400px]">
      <div className="flex items-center justify-between">
        <h1 className="title-1-b hidden xl:block">마이페이지</h1>

        <div className="flex items-center gap-6">
          <Link href="/editProfile" className="">
            <ButtonRounded label="프로필 수정" color="gray" />
          </Link>
          <Link href="/userSetting" className="hidden xl:block">
            <Setting width={32} height={32} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center xl:mt-8 xl:flex-row xl:justify-between">
        <div className="flex flex-col items-center justify-center xl:flex-row xl:gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-200">
            <Skeleton className="h-20 w-20 rounded-full" />
          </div>

          <div className="flex flex-col items-center xl:items-start">
            <Skeleton className="mt-4 h-[26px] w-[100px] md:w-[150px]" />
            <Skeleton className="h-[18px] w-[100px] md:w-[150px]" />
          </div>
        </div>

        <Skeleton className="mt-6 h-[46px] w-[335px] rounded-[44px] md:w-[500px]" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
