'use client';

import CreateReviewHeader from '@/components/review/new/participant/CreateReviewHeader';
import CreateReviewButtons from '@/components/review/new/CreateReviewButtons';
import SelectTravel from '@/components/review/new/SelectTravel';
import SelectHashTag from '@/components/review/new/organizer/SelectHashTag';
import ReviewParticipantContainer from '@/components/review/new/participant/ReviewParticipantContainer';
import { useState } from 'react';

const CreateReviewPage = ({ id, title }: { id?: number; title?: string }) => {
  const [isFirstPage, setIsFirstPage] = useState(true);

  return (
    <form
      method="dialog"
      className="heading-1-sb flex h-fit w-full flex-col px-6 pb-6 pt-8 text-label-normal"
    >
      <CreateReviewHeader />
      <main className="flex flex-col gap-6">
        <SelectTravel id={id} title={title} />
        {isFirstPage ? <SelectHashTag /> : <ReviewParticipantContainer />}
      </main>

      <CreateReviewButtons
        isFirstPage={isFirstPage}
        clickNext={() => setIsFirstPage(false)}
      />
    </form>
  );
};

export default CreateReviewPage;
