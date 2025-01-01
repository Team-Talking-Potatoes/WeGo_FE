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
    <div className="relative aspect-[375/250] max-h-[515px] w-full">
      <Swiper
        spaceBetween={10}
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
            <div className="flex h-full justify-center bg-background-alternative">
              <div className="relative z-10 aspect-[375/250] h-full w-full rounded-lg md:max-h-[515px] md:max-w-[768px]">
                <Image
                  src={image}
                  alt={`${index}번째 리뷰 이미지`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewThumbnail;
