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
import DomesticTag from '../common/tag/DomesticTag';
import ProgressBar from '../common/ProgressBar';
import ExpiredTag from '../common/tag/ExpiredTag';
import CheckMarkButton from '../common/button/CheckMarkButton';

interface Props extends Travel {
  closed?: boolean;
  checkMark?: boolean;
  isChecked?: boolean;
}

const TravelCard = ({
  travelId,
  isDomestic,
  travelName,
  location,
  maxTravelMateCount,
  currentTravelMateCount,
  formattedStartDate,
  image,
  closed,
  checkMark,
  isChecked,
}: Props) => {
  const [isCheckedState, setIsCheckedState] = useState(isChecked);
  const [animate, setAnimate] = useState(false);

  const progressRate = useMemo(
    () => Math.round((currentTravelMateCount / maxTravelMateCount) * 100),
    [currentTravelMateCount, maxTravelMateCount],
  );
  const iconAndText =
    "flex items-center gap-0.5 after:ml-[6px] after:text-line-normal after:content-['|']";

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
    <Link href={`/travel/${travelId}`} className="flex gap-4 md:gap-9">
      <div
        className={cn(
          'relative h-[120px] w-[100px] flex-shrink-0 rounded md:h-[160px] md:w-[223px]',
          {
            'after:absolute after:inset-0 after:rounded after:bg-black after:opacity-50':
              closed,
          },
        )}
      >
        <Image
          src={image}
          alt={`${travelName} - ${location} 여행 이미지`}
          width={300}
          height={300}
          className="h-full w-full rounded object-cover"
        />
        {closed && (
          <div className="body-3-sb absolute inset-0 z-10 flex items-center justify-center text-primary-white">
            마감된 여행
          </div>
        )}
        {checkMark && (
          <CheckMarkButton
            isChecked={isCheckedState}
            animate={animate}
            handler={handleCheckMark}
          />
        )}
      </div>

      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <DomesticTag isDomestic={isDomestic} />
            {closed && <ExpiredTag />}
          </div>
          <h3 className="line-clamp-2 font-bold">{travelName}</h3>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-[6px] text-xs font-semibold text-gray-500">
            <span className={iconAndText}>
              <Location />
              {location}
            </span>
            <span className={iconAndText}>
              <ProfileICon />
              {`${currentTravelMateCount}/${maxTravelMateCount}`}
            </span>
            <span>{formattedStartDate}</span>
          </div>
          {!closed && <ProgressBar progressRate={progressRate} />}
        </div>
      </div>
    </Link>
  );
};
export default TravelCard;
