'use client';

import Link from 'next/link';
import AddCircle from '@/assets/add.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import MainReviewCard from '@/components/card/Review/MainReviewCard';
import 'swiper/css';
import 'swiper/css/pagination';
import { Review } from '@/@types/review';
import ButtonRounded from '@/components/common/button/ButtonRounded';
import WeeklyReviewHeader from './WeeklyReviewHeader';

type Props = Pick<Review, 'reviewId' | 'nickname' | 'reviewImage'>[];

const WeeklyReview = ({ reviewList }: { reviewList: Props }) => {
  if (reviewList.length === 0) {
    return (
      <section className="flex h-80 flex-col justify-start gap-5 bg-black px-5 py-10 md:px-10">
        <WeeklyReviewHeader />
        <div className="heading-1-sb flex h-72 w-full flex-col items-center justify-center gap-5 text-primary-white">
          여행에 참여하고 후기를 남겨보세요!
          <Link href="/travel">
            <ButtonRounded color="gray" label="여행모임 보러가기" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-start gap-5 bg-black px-5 py-10 md:px-10">
      <WeeklyReviewHeader />
      <main
        className="flex xl:max-w-[1400px] 2xl:m-auto"
        aria-label="이미지 가로 슬라이드"
      >
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          grabCursor
          modules={[Pagination]}
          style={{ width: '100%', height: 'auto' }}
          breakpoints={{
            768: {
              spaceBetween: 24,
            },
          }}
        >
          {reviewList &&
            reviewList.map((review) => (
              <SwiperSlide
                key={review.reviewId}
                style={{ width: 'auto', height: 'auto' }}
              >
                <MainReviewCard
                  reviewId={review.reviewId}
                  nickname={review.nickname}
                  reviewImage={review.reviewImage}
                />
              </SwiperSlide>
            ))}
          <SwiperSlide style={{ width: '120px' }}>
            <Link href="/review" className="flex h-full items-center p-5">
              <AddCircle
                width={36}
                height={36}
                aria-label="더 많은 리뷰 보기"
                className="text-primary-white"
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      </main>
    </section>
  );
};

export default WeeklyReview;
