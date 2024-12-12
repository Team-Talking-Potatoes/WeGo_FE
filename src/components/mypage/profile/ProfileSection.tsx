import Image from 'next/image';
import DefaultProfile from '@/assets/icon/default_profile.svg';
import ButtonRounded from '@/components/common/button/ButtonRounded';
import Link from 'next/link';

const profileImage = '';

const ProfileSection = () => {
  return (
    <section className="relative mx-auto h-[280px] max-w-[335px]">
      <Link href="/mypage/editProfile" className="absolute top-3">
        <ButtonRounded label="프로필 수정" type="profileEdit" />
      </Link>

      <div className="flex flex-col items-center justify-center">
        <div className="mt-9 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="프로필 이미지"
              fill
              className="object-cover"
            />
          ) : (
            <DefaultProfile />
          )}
        </div>

        <p className="title-5-b mt-4">여행지기</p>
        <p className="body-3-r text-label-alternative">fake@email.com</p>
        <p className="body-2-sb mt-6 flex h-[46px] w-[335px] items-center justify-center rounded-[44px] bg-label-normal text-primary-white">
          &quot;여행을 너무 좋아하는 여행지기 입니다.&quot;
        </p>
      </div>
    </section>
  );
};

export default ProfileSection;
