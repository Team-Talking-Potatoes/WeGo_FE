import { TravelPlan } from '@/@types/travel';
import LocationIcon from '@/assets/location.svg';
import Image from 'next/image';

const TravelPlanCard = ({
  image,
  destination,
  description,
}: Omit<TravelPlan, 'tripDay' | 'tripOrderNumber'>) => {
  return (
    <div className="max-w-[546px] overflow-hidden rounded bg-background-alternative sm:flex sm:aspect-[538/130]">
      <div className="flex aspect-[249/100] h-[50%] w-full flex-shrink-0 overflow-hidden sm:h-full sm:w-[50%]">
        <Image
          src={image}
          alt={`${destination} 일정 이미지`}
          width={600}
          height={500}
          className="h-full w-full object-cover transition-opacity duration-300 ease-in-out"
          style={{ opacity: 0 }}
          onLoadingComplete={(img: HTMLImageElement) => {
            const imgElement = img;
            imgElement.style.opacity = '1';
          }}
        />
      </div>

      <div className="relative flex flex-col items-start justify-start overflow-scroll px-3 py-4 custom-scrollbar sm:px-5 xl:w-[50%]">
        <div className="heading-1-b flex w-full items-start gap-1">
          <LocationIcon fill="#6B7280" stroke="#6B7280" />
          <span>{destination}</span>
        </div>
        <div className="body-2-r">{description}</div>
      </div>
    </div>
  );
};

export default TravelPlanCard;
