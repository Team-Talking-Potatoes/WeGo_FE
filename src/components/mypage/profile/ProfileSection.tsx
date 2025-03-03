'use client';

import Image from 'next/image';
import DefaultProfile from '@/assets/icon/default_profile.svg';
import ButtonRounded from '@/components/common/button/ButtonRounded';
import Link from 'next/link';
import useGetUser from '@/queries/user/useGetUser';
import Setting from '@/assets/icon/setting_32px.svg';
import cn from '@/utils/cn';
import ProfileSkeleton from '../skeleton/ProfileSkeleton';

const ProfileSection = () => {
  const { data: user, isLoading } = useGetUser();

  if (isLoading) return <ProfileSkeleton />;

  return (
    <section className="relative mx-auto mb-8 max-w-[335px] md:max-w-[688px] xl:mb-[60px] xl:max-w-[1400px]">
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
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-200">
            {user?.profileImage ? (
              <Image
                src={user.profileImage}
                alt="프로필 이미지"
                fill
                className="object-cover opacity-0 duration-300 ease-in-out"
                onLoadingComplete={(img) => {
                  img.classList.remove('opacity-0');
                  img.classList.add('opacity-100');
                }}
              />
            ) : (
              <DefaultProfile aria-label="기본 프로필 이미지" />
            )}
          </div>

          <div className="flex flex-col items-center xl:items-start">
            <p className="title-5-b mt-4 xl:mt-0">{user?.nickname}</p>
            <p className="body-3-r text-label-alternative">{user?.email}</p>
          </div>
        </div>

        <p
          className={cn(
            'body-2-sb mt-6 flex h-[46px] w-full max-w-[500px] items-center justify-center rounded-[44px] bg-label-normal text-primary-white xl:mt-0',
            {
              'text-gray-300': !user?.description,
            },
          )}
        >
          {user?.description || '나의 소개글을 입력 해 주세요.'}
        </p>
      </div>
    </section>
  );
};

export default ProfileSection;
