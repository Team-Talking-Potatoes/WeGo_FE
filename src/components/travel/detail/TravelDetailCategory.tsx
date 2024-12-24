'use client';

import { TravelDetail } from '@/@types/travel';
import { useState, useTransition } from 'react';
import TravelButtons from './TravelButtons';
import SelectTravelDetail from './category/SelectTravelDetail';
import SelectTravelItinerary from './category/SelectTravelItinerary';
import SelectTravelReview from './category/SelectTravelReview';

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
  const [isPending, startTransition] = useTransition();

  const onClickCategory = (selectedCategory: Category) => {
    startTransition(() => {
      setCategory(selectedCategory);
    });
  };
  const organizer = participant.find((part) => part.role === 'ORGANIZER');
  const now = new Date();
  const endDate = new Date(endAt);
  const selectCss = 'border-b-[3px] border-label-normal text-label-normal';

  const categories = [
    { label: '여행상세', value: 'details' },
    { label: '여행일정', value: 'itinerary' },
    { label: '모임리뷰', value: 'review', disabled: now <= endDate },
  ];

  return (
    <section className="pb-20">
      <header className="heading-1-b z-20 flex items-start gap-5 border-b px-5 text-label-alternative md:gap-8">
        {categories.map(
          ({ label, value, disabled }, index) =>
            !disabled && (
              <button
                key={value}
                type="button"
                onClick={() => !disabled && onClickCategory(value as Category)}
                className={`cursor-pointer pb-2.5 ${index === 0 ? 'md:ml-5' : ''} ${category === value || isPending ? selectCss : ''}`}
              >
                {label}
              </button>
            ),
        )}
      </header>
      <div className="px-5 pb-10 pt-6 md:px-10">
        {category === 'details' && (
          <SelectTravelDetail
            travelId={travelId}
            participant={false}
            organizer={organizer}
            hashTags={hashTags}
            description={description}
          />
        )}
        {category === 'itinerary' && (
          <SelectTravelItinerary
            tripDuration={tripDuration}
            travelPlan={travelPlan}
            startAt={startAt}
          />
        )}
        {category === 'review' && <SelectTravelReview travelId={travelId} />}
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
