import Error from '@/assets/error.svg';
import Square from '@/assets/square.svg';
import RoundCheck from '@/assets/round_check.svg';
import { Participant } from '@/@types/travel';
import { useMemo } from 'react';
import UserIconList from '@/components/common/user/UserIconList';
import ProgressBar from '@/components/common/progressbar/ProgressBar';

interface Props {
  isDateOver: boolean;
  minTravelMateCount: number;
  maxTravelMateCount: number;
  participant: Participant[];
}

const RecruitmentBox = ({
  isDateOver,
  minTravelMateCount,
  maxTravelMateCount,
  participant,
}: Props) => {
  const personnel = 'flex items-center gap-1.5';

  const progressRate = useMemo(
    () => Math.round((participant.length / maxTravelMateCount) * 100),
    [participant, maxTravelMateCount],
  );

  if (isDateOver) {
    return (
      <div className="flex items-center gap-1.5 rounded bg-slate-50 px-4 py-3">
        <Error />
        <span className="body-2-sb text-label-neutral">마감된 여행입니다.</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col rounded bg-slate-50 px-5 py-4">
      <div className="flex justify-between pb-3">
        <span className="flex items-center gap-1.5">
          {participant.length === maxTravelMateCount ? (
            <>
              <RoundCheck />
              <span className="body-2-sb text-label-neutral">모집 완료!</span>
            </>
          ) : (
            <>
              <Square />
              <span className="body-2-sb text-label-neutral">모집 중</span>
            </>
          )}
        </span>
        <UserIconList participant={participant} />
      </div>
      <ProgressBar progressRate={progressRate} />
      <div className="flex justify-between pt-2 text-xs font-medium">
        <div className={personnel}>
          <span className="text-gray-500">최소인원</span>
          <span className="text-gray-600">{minTravelMateCount}명</span>
        </div>
        <div className={personnel}>
          <span className="text-gray-500">최대인원</span>
          <span className="text-gray-600">{maxTravelMateCount}명</span>
        </div>
      </div>
    </div>
  );
};
export default RecruitmentBox;
