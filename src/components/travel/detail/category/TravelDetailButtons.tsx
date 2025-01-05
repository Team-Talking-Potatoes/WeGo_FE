'use client';

import { useEffect, useState } from 'react';
import SpinnerButtonIcon from '@/assets/icon/loading/spinner-button.svg';
import BookMarkIcon from '@/assets/bookmark.svg';
import {
  useBookmarkTravel,
  useDeleteBookmarkTravel,
} from '@/queries/travel/useBookmarkTravel';
import ButtonRounded from '@/components/common/button/ButtonRounded';
import Link from 'next/link';

const TravelDetailButtons = ({
  organizerId,
  userId,
  isBookmark,
  travelId,
}: {
  organizerId: number;
  userId: number;
  isBookmark: boolean | null;
  travelId: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(isBookmark);
  const { mutate: postBookMark } = useBookmarkTravel();
  const { mutate: deleteBookMark } = useDeleteBookmarkTravel();

  useEffect(() => {
    setIsBookmarked(isBookmark);
    setIsLoading(false);
  }, [isBookmark]);

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

  if (isLoading) {
    return <SpinnerButtonIcon className="animate-spin" />;
  }

  return (
    <div className="flex items-center gap-2.5">
      {organizerId !== userId ? (
        <button onClick={handleClickBookMark} type="button" aria-label="북마크">
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
  );
};

export default TravelDetailButtons;
