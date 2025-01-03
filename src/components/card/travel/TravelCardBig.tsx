'use client';

import Image from 'next/image';
import Location from '@/assets/location.svg';
import ProfileICon from '@/assets/profile.svg';
import { Travel } from '@/@types/travel';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import cn from '@/utils/cn';
import {
  useBookmarkTravel,
  useDeleteBookmarkTravel,
} from '@/queries/travel/useBookmarkTravel';
import { formatDateToShortWithDay } from '@/utils/dateChangeKr';
import DomesticTag from '../../common/tag/DomesticTag';
import ProgressBar from '../../common/progressbar/ProgressBar';
import ExpiredTag from '../../common/tag/ExpiredTag';
import CheckMarkButton from '../../common/button/CheckMarkButton';

interface Props extends Travel {
  closed?: boolean;
  isBookmark: boolean | null;
}

const TravelCardBig = ({
  travelId,
  isDomestic,
  travelName,
  location,
  maxTravelMateCount,
  currentTravelMateCount,
  startAt,
  endAt,
  image,
  closed,
  isBookmark,
}: Props) => {
  const [isCheckedState, setIsCheckedState] = useState(isBookmark);
  const [animate, setAnimate] = useState(false);

  const progressRate = useMemo(
    () => Math.round((currentTravelMateCount / maxTravelMateCount) * 100),
    [currentTravelMateCount, maxTravelMateCount],
  );

  const { mutate: postBookMark } = useBookmarkTravel();
  const { mutate: deleteBookMark } = useDeleteBookmarkTravel();

  const handleCheckMark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);

    if (!isCheckedState) {
      postBookMark(travelId, {
        onError: () => setIsCheckedState(false),
      });
    } else {
      deleteBookMark(travelId, {
        onError: () => setIsCheckedState(true),
      });
    }
    setIsCheckedState(!isCheckedState);
  };

  return (
    <Link
      href={`/travel/${travelId}`}
      className="flex aspect-[335/290] w-full flex-col overflow-hidden rounded border"
    >
      <div
        className={cn('relative h-[48.28%]', {
          'after:absolute after:inset-0 after:rounded after:bg-black after:opacity-50':
            closed,
        })}
      >
        <Image
          src={image}
          alt={`${travelName} - ${location} 여행 이미지`}
          width={400}
          height={200}
          className="h-full w-full object-cover"
        />
        {closed && (
          <div className="body-3-sb absolute inset-0 z-10 flex items-center justify-center text-primary-white">
            마감된 여행
          </div>
        )}
        {isCheckedState !== null && (
          <CheckMarkButton
            isChecked={isCheckedState}
            animate={animate}
            handler={handleCheckMark}
            locatedRight
          />
        )}
      </div>

      <div className="flex h-full w-full flex-col justify-between gap-1.5 rounded px-4 pb-4 pt-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <DomesticTag isDomestic={isDomestic} />
            {closed && <ExpiredTag />}
          </div>
          <h3 className="title-5-b line-clamp-1">{travelName}</h3>
        </div>
        <div className="flex flex-col gap-[1.125rem]">
          <div className="body-3-sb line-clamp-1 flex h-3.5 items-center divide-x divide-line-normal text-gray-500">
            <div className="body-3-sb flex flex-shrink-0 items-center gap-0.5 pr-1.5">
              <Location />
              {location}
            </div>
            <div className="body-3-r flex items-center gap-0.5 px-1.5">
              <ProfileICon />
              {`${currentTravelMateCount}/${maxTravelMateCount}`}
            </div>
            <div className="body-3-r flex flex-shrink-0 gap-0.5 pl-1.5">
              {formatDateToShortWithDay(startAt)} -
              {formatDateToShortWithDay(endAt)}
            </div>
          </div>
          {!closed && <ProgressBar progressRate={progressRate} />}
        </div>
      </div>
    </Link>
  );
};
export default TravelCardBig;
