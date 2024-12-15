'use client';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  reviewImages: string[];
}

const ReviewThumbnail = ({ reviewImages }: Props) => {
  return (
    <div className="h-[250px] w-full">
      <Swiper
        spaceBetween={10}
        centeredSlides
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        grabCursor
      >
        {reviewImages.map((image, index) => (
          <SwiperSlide key={image}>
            <div className="relative z-10 flex h-[250px] w-full items-center justify-center rounded-lg">
              <Image
                src={image}
                alt={`${index}번째 리뷰 이미지`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewThumbnail;
