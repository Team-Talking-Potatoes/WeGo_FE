import EmptyShapes from '@/assets/icon/empty_shape.svg';
import Dot from '@/assets/icon/dot.svg';

interface PropsWithMessage {
  message: string;
  travelSuggestion?: boolean;
}

interface PropsWithTravelSuggestion {
  message?: string;
  travelSuggestion: boolean;
}

type Props = PropsWithMessage | PropsWithTravelSuggestion;

const NoTravel = ({ message, travelSuggestion }: Props) => {
  if (travelSuggestion)
    return (
      <div className="mt-[80px]">
        <div>
          나의 취향을 담은
          <br />
          여행 모임을 한번 만들어보세요.
        </div>
      </div>
    );

  return (
    <div className="mt-[80px] flex flex-col items-center">
      <div className="relative h-9 w-9">
        <EmptyShapes className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center gap-1">
          <Dot />
          <Dot />
          <Dot />
        </div>
      </div>
      <p className="heading-1-sb mt-4 text-label-alternative">{message}</p>
    </div>
  );
};

export default NoTravel;
