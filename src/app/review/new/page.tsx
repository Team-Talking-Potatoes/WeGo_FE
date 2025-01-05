'use client';

import CreateReviewHeader from '@/components/review/new/participant/CreateReviewHeader';
import CreateReviewButtons from '@/components/review/new/CreateReviewButtons';
import SelectTravel from '@/components/review/new/SelectTravel';
import SelectHashTag from '@/components/review/new/organizer/SelectHashTag';
import ReviewParticipantContainer from '@/components/review/new/participant/ReviewParticipantContainer';
import { Suspense, useState } from 'react';
import SpinnerIcon from '@/assets/icon/loading/spinner-button.svg';

const CreateReviewPage = () => {
  const [isFirstPage, setIsFirstPage] = useState(true);

  return (
    <Suspense
      fallback={
        <div className="mt-4 flex h-[46px] items-center justify-center">
          <SpinnerIcon className="animate-spin" />
        </div>
      }
    >
      <form
        method="dialog"
        className="heading-1-sb flex h-fit w-full flex-col px-6 pb-6 pt-8 text-label-normal"
      >
        <CreateReviewHeader />
        <main className="flex flex-col gap-6">
          <SelectTravel />

          {isFirstPage ? <SelectHashTag /> : <ReviewParticipantContainer />}
        </main>

        <CreateReviewButtons
          isFirstPage={isFirstPage}
          clickNext={() => setIsFirstPage(false)}
        />
      </form>
    </Suspense>
  );
};

export default CreateReviewPage;
