'use client';

import CreateReviewHeader from '@/components/review/new/CreateReviewHeader';
import { Textarea } from '@headlessui/react';
import BlueStart from '@/assets/star_24px.svg';
import { useState } from 'react';
import InputImage from '@/components/review/new/InputImage';
import CreateReviewButtons from '@/components/review/new/CreateReviewButtons';

const CreateReviewPage = () => {
  const [textValue, setTextValue] = useState('');
  const [selectedStars, setSelectedStars] = useState(0);

  const handleClick = (index: number) => {
    setSelectedStars(index + 1);
  };

  const sectionCss = 'flex w-full flex-col gap-3';

  return (
    <form
      method="dialog"
      className="heading-1-sb flex w-full flex-col px-6 py-8 text-label-normal"
    >
      <CreateReviewHeader />
      <span className="body-2-m mb-4 mt-2.5 w-full bg-blue-50 py-2 text-center text-primary-normal">
        리뷰를 작성하고, 당신만의 여행피드를 완성하세요!
      </span>
      <section className={`pb-6 ${sectionCss}`}>
        <header>만족스러운 여행이었나요?</header>
        <main className="flex" aria-label="별점을 매겨주세요">
          {[1, 2, 3, 4, 5].map((v, index) => (
            <BlueStart
              key={`star-${v}`}
              className={`cursor-pointer ${index < selectedStars ? 'text-primary-normal' : 'text-label-disable'}`}
              onClick={() => handleClick(index)}
              aria-label={`${v}점`}
            />
          ))}
        </main>
      </section>
      <section className={`pb-6 ${sectionCss}`}>
        <header>여행에 대한 후기를 남겨주세요!</header>

        <Textarea
          name="여행후기"
          value={textValue}
          aria-label="여행 후기를 작성해주세요"
          placeholder="여행에 대한 다양한 후기를 공유 해 주세요!"
          onChange={(e) => setTextValue(e.target.value)}
          className="body-2-r h-[90px] w-full resize-none border-none bg-background-alternative px-4 py-3 text-label-normal placeholder:text-interaction-inactive focus:outline-label-alternative"
          maxLength={100}
        />
      </section>
      <section className={`pb-10 ${sectionCss}`}>
        <header>여행의 순간을 함께 보여주세요.</header>
        <main aria-label="여행 후기 이미지를 등록해주세요">
          <InputImage />
          <span className="body-3-r text-primary-normal">
            이미지는 최대 5개 등록 가능합니다.
          </span>
        </main>
      </section>
      <CreateReviewButtons />
    </form>
  );
};

export default CreateReviewPage;
