'use client';

import CreateReviewHeader from '@/components/review/new/participant/CreateReviewHeader';
import CreateReviewButtons from '@/components/review/new/CreateReviewButtons';
import SelectTravel from '@/components/review/new/SelectTravel';
import SelectHashTag from '@/components/review/new/organizer/SelectHashTag';
import ReviewParticipantContainer from '@/components/review/new/participant/ReviewParticipantContainer';
import { Suspense, use, useState } from 'react';

const CreateReviewPage = ({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; title?: string }>;
}) => {
  const { id, title } = use(searchParams);
  const travelId = id ? Number(id) : undefined;
  const [isFirstPage, setIsFirstPage] = useState(true);
  return (
    <form
      method="dialog"
      className="heading-1-sb flex h-fit w-full flex-col px-6 pb-6 pt-8 text-label-normal"
    >
      <CreateReviewHeader />
      <main className="flex flex-col gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          <SelectTravel id={travelId} title={title} />
          {isFirstPage ? <SelectHashTag /> : <ReviewParticipantContainer />}
        </Suspense>
      </main>

      <CreateReviewButtons
        isFirstPage={isFirstPage}
        clickNext={() => setIsFirstPage(false)}
      />
    </form>
  );
};

export default CreateReviewPage;
