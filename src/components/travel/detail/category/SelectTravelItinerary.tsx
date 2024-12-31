'use client';

import { TravelDetail } from '@/@types/travel';
import ArrowDownIcon from '@/assets/arrow_down.svg';
import { useState } from 'react';
import { formatDateToShortWithDay } from '@/utils/dateChangeKr';
import TravelPlanCard from '../../../card/travel/TravelPlanCard';

type Props = Pick<TravelDetail, 'tripDuration' | 'travelPlan' | 'startAt'>;

const SelectTravelItinerary = ({
  tripDuration,
  travelPlan,
  startAt,
}: Props) => {
  const [isOpen, setIsOpen] = useState<Set<number>>(new Set());

  const toggleDay = (day: number) => {
    setIsOpen((prev) => {
      const newOpen = new Set(prev);
      if (newOpen.has(day)) {
        newOpen.delete(day);
      } else {
        newOpen.add(day);
      }
      return newOpen;
    });
  };

  return (
    <div className="flex w-full flex-col gap-6 divide-y divide-line-normal">
      {Array.from({ length: tripDuration }, (_, index) => index + 1).map(
        (i) => (
          <div
            key={i}
            className={`flex w-full items-start justify-start gap-5 sm:gap-10 ${i !== 1 && 'pt-6'}`}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => toggleDay(i)}
              onKeyDown={(e) => e.key === 'Enter' && toggleDay(i)}
              className={`group flex cursor-pointer ${isOpen.has(i) ? 'w-fit' : 'w-full'}`}
            >
              <div className="flex w-full items-center justify-between gap-5 md:gap-10">
                <div className="flex-shrink-0">
                  <div className="title-5-b flex items-center gap-1">
                    <span>Day {i}</span>
                    <ArrowDownIcon
                      className={`transform transition-transform ${
                        isOpen.has(i) ? 'scale-y-[-1]' : ''
                      }`}
                    />
                  </div>
                  <span className="body-2-m text-label-alternative">
                    {formatDateToShortWithDay(startAt, i - 1)}
                  </span>
                </div>

                {!isOpen.has(i) && (
                  <div className="group body-2-m h-fit rounded-[20px] bg-gray-100 px-2.5 py-1 text-label-neutral group-hover:bg-primary-normal group-hover:text-primary-white">
                    상세 일정 확인
                  </div>
                )}
              </div>
            </div>

            {isOpen.has(i) && (
              <div className="flex w-full flex-col gap-4">
                {travelPlan
                  .filter((plan) => plan.tripDay === i)
                  .map((plan) => (
                    <TravelPlanCard
                      key={plan.destination}
                      image={plan.image}
                      destination={plan.destination}
                      description={plan.description}
                    />
                  ))}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
};

export default SelectTravelItinerary;
