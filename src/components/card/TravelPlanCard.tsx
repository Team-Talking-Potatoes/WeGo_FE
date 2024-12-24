import { TravelPlan } from '@/@types/travel';
import LocationIcon from '@/assets/location.svg';
import Image from 'next/image';

const TravelPlanCard = ({
  image,
  destination,
  description,
}: Omit<TravelPlan, 'tripDay' | 'tripOrderNumber'>) => {
  return (
    <div className="overflow-hidden rounded bg-background-alternative md:flex md:w-[538px]">
      <div className="flex h-[100px] w-full flex-shrink-0 items-center overflow-hidden md:h-[130px] md:w-[269px]">
        <Image
          src={image}
          alt={`${destination} 일정 이미지`}
          width={600}
          height={500}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col items-start justify-center px-3 py-4 md:px-5 md:py-0">
        <div className="heading-1-b flex items-center gap-1">
          <LocationIcon fill="#6B7280" stroke="#6B7280" />
          <span>{destination}</span>
        </div>
        <div className="body-2-r pt-1">{description}</div>
      </div>
    </div>
  );
};

export default TravelPlanCard;
