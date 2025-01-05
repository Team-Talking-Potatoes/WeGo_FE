'use client';

import { Participant, TravelDetail } from '@/@types/travel';
import React, { Suspense, useState } from 'react';
import dayjs from 'dayjs';
import SpinnerIcon from '@/assets/spinner_round.svg';
import TabTravelReview from './category/TabTravelReview';
import TabTravelDetail from './category/TabTravelDetail';

type Props = Pick<
  TravelDetail,
  | 'travelId'
  | 'hashTags'
  | 'description'
  | 'tripDuration'
  | 'travelPlan'
  | 'startAt'
  | 'endAt'
  | 'participationFlag'
  | 'isBookmark'
> & { organizer?: Participant };
type Category = 'details' | 'itinerary' | 'review';

const TabTravelItinerary = React.lazy(
  () => import('./category/TabTravelItinerary'),
);

const TravelDetailCategory = ({
  travelId,
  hashTags,
  description,
  tripDuration,
  travelPlan,
  startAt,
  endAt,
  participationFlag,
  organizer,
  isBookmark,
}: Props) => {
  const [category, setCategory] = useState<Category>('details');

  const onClickCategory = (selectedCategory: Category) => {
    if (category !== selectedCategory) {
      setCategory(selectedCategory);
    }
  };

  const now = dayjs();
  const endDate = dayjs(endAt);

  const categories = [
    { label: '여행상세', value: 'details' },
    { label: '여행일정', value: 'itinerary' },
    { label: '모임리뷰', value: 'review', disabled: now <= endDate },
  ];

  return (
    <section className="mx-auto min-h-[300px] w-full px-5 xs:max-w-[540px] sm:px-0 md:col-span-2 md:max-w-full md:pt-4 xl:mx-0 xl:max-w-[652px]">
      <header className="heading-1-b z-20 flex items-start gap-5 border-b text-label-alternative md:gap-8">
        {categories.map(({ label, value, disabled }) => (
          <button
            key={value}
            type="button"
            onClick={() => !disabled && onClickCategory(value as Category)}
            className={`cursor-pointer pb-2.5 ${category === value && 'border-b-[3px] border-label-normal text-label-normal'}`}
            disabled={disabled}
          >
            {!disabled && label}
          </button>
        ))}
      </header>
      <div className="pt-6">
        {category === 'details' && (
          <TabTravelDetail
            travelId={travelId}
            participationFlag={participationFlag}
            organizer={organizer}
            hashTags={hashTags}
            description={description}
            isBookmark={isBookmark}
          />
        )}

        {category === 'itinerary' && (
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center p-8">
                <SpinnerIcon className="animate-spin" />
              </div>
            }
          >
            <TabTravelItinerary
              tripDuration={tripDuration}
              travelPlan={travelPlan}
              startAt={startAt}
            />
          </Suspense>
        )}
        {category === 'review' && (
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center p-8">
                <SpinnerIcon className="animate-spin" />
              </div>
            }
          >
            <TabTravelReview travelId={travelId} />
          </Suspense>
        )}
      </div>
    </section>
  );
};
export default TravelDetailCategory;
