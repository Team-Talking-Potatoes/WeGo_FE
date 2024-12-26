'use client';

import { TravelDetail } from '@/@types/travel';
import React, { Suspense, useState } from 'react';
import TravelButtons from './TravelButtons';
import SelectTravelReview from './category/SelectTravelReview';
import SelectTravelDetail from './category/SelectTravelDetail';

type Props = Pick<
  TravelDetail,
  | 'travelId'
  | 'hashTags'
  | 'participant'
  | 'description'
  | 'tripDuration'
  | 'travelPlan'
  | 'startAt'
  | 'endAt'
>;
type Category = 'details' | 'itinerary' | 'review';

const SelectTravelItinerary = React.lazy(
  () => import('./category/SelectTravelItinerary'),
);

const TravelDetailCategory = ({
  travelId,
  hashTags,
  participant,
  description,
  tripDuration,
  travelPlan,
  startAt,
  endAt,
}: Props) => {
  const [category, setCategory] = useState<Category>('details');

  const onClickCategory = (selectedCategory: Category) => {
    if (category !== selectedCategory) {
      setCategory(selectedCategory);
    }
  };

  const organizer = participant.find((part) => part.role === 'ORGANIZER');
  const now = new Date();
  const endDate = new Date(endAt);

  const categories = [
    { label: '여행상세', value: 'details' },
    { label: '여행일정', value: 'itinerary' },
    { label: '모임리뷰', value: 'review', disabled: now <= endDate },
  ];

  return (
    <section className="w-full max-w-[764px] pb-20 md:col-span-2">
      <header className="heading-1-b z-20 flex items-start gap-5 border-b text-label-alternative md:gap-8">
        {categories.map(({ label, value, disabled }) => (
          <button
            key={value}
            type="button"
            onClick={() => !disabled && onClickCategory(value as Category)}
            className={`cursor-pointer pb-2.5 ${category === value ? 'border-b-[3px] border-label-normal text-label-normal' : ''}`}
            disabled={disabled}
          >
            {!disabled && label}
          </button>
        ))}
      </header>
      <div className="pb-10 pt-6">
        {category === 'details' && (
          <SelectTravelDetail
            travelId={travelId}
            participant={false}
            organizer={organizer}
            hashTags={hashTags}
            description={description}
          />
        )}

        <Suspense fallback={<div>Loading...</div>}>
          {category === 'itinerary' && (
            <SelectTravelItinerary
              tripDuration={tripDuration}
              travelPlan={travelPlan}
              startAt={startAt}
            />
          )}
          {category === 'review' && <SelectTravelReview travelId={travelId} />}
        </Suspense>

        {(category === 'itinerary' || category === 'details') &&
          now < endDate && (
            <TravelButtons
              travelId={travelId}
              organizer={organizer?.id}
              participant={participant}
            />
          )}
      </div>
    </section>
  );
};
export default TravelDetailCategory;
