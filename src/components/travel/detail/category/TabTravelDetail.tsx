import BookMarkIcon from '@/assets/bookmark.svg';
import { Participant } from '@/@types/travel';
import { useState } from 'react';
import Link from 'next/link';
import {
  useBookmarkTravel,
  useDeleteBookmarkTravel,
} from '@/queries/travel/useBookmarkTravel';
import useGetUser from '@/queries/user/useGetUser';
import ButtonRounded from '../../../common/button/ButtonRounded';
import TravelTag from '../../../common/tag/TravelTag';
import UserIcon from '../../../common/user/UserIcon';

const TabTravelDetail = ({
  travelId,
  participationFlag,
  organizer,
  hashTags,
  description,
}: {
  travelId: number;
  participationFlag: boolean | null;
  organizer?: Participant;
  hashTags: string;
  description: string;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(participationFlag);
  const { mutate: postBookMark } = useBookmarkTravel();
  const { mutate: deleteBookMark } = useDeleteBookmarkTravel();

  const { data: user } = useGetUser();

  const handleClickBookMark = () => {
    if (isBookmarked) {
      deleteBookMark(travelId, {
        onError: () => setIsBookmarked(true),
      });
    } else {
      postBookMark(travelId, {
        onError: () => setIsBookmarked(false),
      });
    }
    setIsBookmarked((prev) => !prev);
  };

  const hashTagList = hashTags
    .split('#')
    .filter((tag) => tag !== '')
    .map((tag) => tag.trim());

  return (
    <section>
      <div className="flex items-center justify-between pb-[18px]">
        <div className="flex items-center gap-[7px]">
          <UserIcon size="sm" />

          <div className="body-2-sb">{organizer && organizer.nickname}</div>
        </div>
        {participationFlag !== null && (
          <div className="flex items-center gap-2.5">
            {organizer?.id !== user?.userId ? (
              <button
                onClick={handleClickBookMark}
                type="button"
                aria-label="북마크"
              >
                <BookMarkIcon
                  fill={isBookmarked ? '#F87171' : 'white'}
                  className={
                    isBookmarked
                      ? 'animate-check-shake'
                      : 'animate-check-shake-reverse'
                  }
                />
              </button>
            ) : (
              <Link href="/">
                <ButtonRounded label="일정수정" color="blue" />
              </Link>
            )}
            <Link href="/chat">
              <ButtonRounded label="채팅방" />
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2.5 rounded border px-4 py-5 shadow-custom">
        <main className="body-1-r md:min-h-24">{description}</main>
        <div className="flex gap-1.5">
          {hashTagList.map((tag) => (
            <TravelTag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TabTravelDetail;
