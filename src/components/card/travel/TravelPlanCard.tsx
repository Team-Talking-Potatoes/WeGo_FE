import { TravelPlan } from '@/@types/travel';
import LocationIcon from '@/assets/location.svg';
import Image from 'next/image';

const TravelPlanCard = ({
  image,
  destination,
  description,
}: Omit<TravelPlan, 'tripDay' | 'tripOrderNumber'>) => {
  return (
    <div className="aspect-[249/204] max-w-[546px] overflow-hidden rounded bg-background-alternative sm:flex sm:aspect-[538/130]">
      <div className="flex h-[50%] w-full flex-shrink-0 overflow-hidden sm:h-full sm:w-[50%]">
        <Image
          src={image}
          alt={`${destination} 일정 이미지`}
          width={600}
          height={500}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col items-start justify-center px-3 py-4 sm:px-5 xl:w-[50%]">
        <div className="heading-1-b flex items-center gap-1">
          <LocationIcon fill="#6B7280" stroke="#6B7280" />
          <span>{destination}</span>
        </div>
        <div className="body-2-r line-clamp-2 pt-1 sm:line-clamp-none">
          {description}
        </div>
      </div>
    </div>
  );
};

export default TravelPlanCard;
