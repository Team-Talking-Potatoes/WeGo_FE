import { PopularUser } from '@/@types/user';
import Link from 'next/link';
import UserIcon from '../../common/user/UserIcon';
import UserTag from '../../common/tag/UserTag';

const UserCard = ({
  nickname,
  profileImage,
  openTravelCount,
  reviewCount,
  hashTags,
  userId,
}: PopularUser) => {
  return (
    <Link
      href={`/${userId}`}
      aria-label={`${nickname} 프로필 보기`}
      className="flex h-[246px] w-[200px] flex-col items-center justify-center rounded border border-line-normal px-[21px] py-5 lg:h-[306px] lg:w-[332px]"
    >
      <UserIcon profileImage={profileImage} nickname={nickname} />
      <div className="flex flex-col items-center justify-center gap-0.5 pb-4 pt-4 md:pt-6">
        <h3 className="heading-1-b">{nickname}</h3>
        <p className="body-3-m whitespace-nowrap text-label-alternative">
          모임장 {openTravelCount}회 • 리뷰 {reviewCount}개
        </p>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {hashTags
          ?.split('#')
          .filter((str) => str.trim() !== '')
          .slice(0, 2)
          .map((str) => <UserTag label={str} key={str} />)}
      </div>
    </Link>
  );
};
export default UserCard;
