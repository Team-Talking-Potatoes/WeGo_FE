import Image from 'next/image';
import Location from '@/assets/location.svg';
import Multiple from '@/assets/multiple.svg';
import { Travel } from '@/@types/travel';
import { useMemo } from 'react';
import Link from 'next/link';
import cn from '@/utils/cn';
import DomesticTag from '../common/tag/DomesticTag';
import ProgressBar from '../common/ProgressBar';
import ExpiredTag from '../common/tag/ExpiredTag';

interface Props extends Travel {
  closed?: boolean;
}

const TravelCard = ({
  // travelId,
  isDomestic,
  travelName,
  travelLocation,
  maxParticipant,
  currentParticipant,
  formattedStartDate,
  closed,
}: Props) => {
  const progressRate = useMemo(
    () => Math.round((currentParticipant / maxParticipant) * 100),
    [currentParticipant, maxParticipant],
  );
  const iconAndText =
    "flex items-center gap-0.5 after:ml-[6px] after:text-line-normal after:content-['|']";

  return (
    <Link href="/" className="flex gap-4">
      <div
        className={cn('relative h-[120px] w-[100px] flex-shrink-0 rounded', {
          'after:absolute after:inset-0 after:rounded after:bg-black after:opacity-50':
            closed,
        })}
      >
        <Image
          src="/test2.png"
          alt={`${travelName} - ${travelLocation} 여행 이미지`}
          width={100}
          height={120}
          className="h-full w-full rounded object-cover"
        />
        {closed && (
          <div className="body-3-sb absolute inset-0 z-50 flex items-center justify-center text-primary-white">
            마감된 여행
          </div>
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
        <div className="flex items-center gap-[6px] text-xs font-semibold text-label-alternative">
          <div className={iconAndText}>
            <Location />
            {travelLocation}
          </div>
          <div className={iconAndText}>
            <Multiple />
            {`${currentParticipant}/${maxParticipant}`}
          </div>
          <div className="">{formattedStartDate}</div>
        </div>
        <ProgressBar progressRate={progressRate} />
      </div>
    </Link>
  );
};
export default TravelCard;
