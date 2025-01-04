import Profile from '@/assets/profile.svg';
import Timeline from '@/assets/timeline.svg';
import DateIcon from '@/assets/date.svg';
import LocationIcon from '@/assets/location.svg';
import { TravelDetail } from '@/@types/travel';
import dayjs from 'dayjs';
import { formatDateToShortWithDay } from '@/utils/dateChangeKr';
import DomesticTag from '../../../common/tag/DomesticTag';
import RecruitmentBox from './RecruitmentBox';

type Props = Pick<
  TravelDetail,
  | 'travelName'
  | 'isDomestic'
  | 'minTravelMateCount'
  | 'maxTravelMateCount'
  | 'startAt'
  | 'endAt'
  | 'participant'
  | 'registrationEnd'
  | 'travelLocation'
>;

const TravelInformation = ({
  travelName,
  isDomestic,
  minTravelMateCount,
  maxTravelMateCount,
  startAt,
  endAt,
  participant,
  registrationEnd,
  travelLocation,
}: Props) => {
  const now = dayjs();
  const endDate = dayjs(registrationEnd);
  const isDateOver = now.isAfter(endDate);
  const info = 'flex items-center justify-start text-gray-500';
  return (
    <main className="flex w-full max-w-[540px] flex-col justify-center px-5 sm:px-0">
      <DomesticTag isDomestic={isDomestic} />
      <h2 className="title-4-b border-b border-line-normal pb-4 pt-1.5 font-bold">
        {travelName}
      </h2>
      <div className="body-2-m flex flex-col gap-2 pt-4">
        <div className={`${info} justify-start`}>
          <LocationIcon />
          <span className="pl-2">{travelLocation}</span>
        </div>
        <div className={`${info} justify-start`}>
          <DateIcon />
          <span className="pl-2">
            {formatDateToShortWithDay(startAt)} -{' '}
            {formatDateToShortWithDay(endAt)}
          </span>
        </div>

        <div className="flex gap-2 divide-x pb-5">
          <div className={`${info}`}>
            <Profile />
            <span className="pl-2 pr-1">모집정원</span>
            <span className="text-primary-normal">{maxTravelMateCount}명</span>
          </div>
          <div className={`${info} pl-2`}>
            <Timeline />
            <span className="pl-2 pr-1">모집기한</span>
            <span className="text-primary-normal">
              {formatDateToShortWithDay(registrationEnd)}
            </span>
          </div>
        </div>
      </div>
      <RecruitmentBox
        isDateOver={isDateOver}
        minTravelMateCount={minTravelMateCount}
        maxTravelMateCount={maxTravelMateCount}
        participant={participant}
      />
    </main>
  );
};

export default TravelInformation;
