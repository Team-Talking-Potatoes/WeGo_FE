'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import '@/styles/swiperStyle.css';
import 'swiper/css/pagination';
import { useState } from 'react';
import HeroImage from './HeroImage';

const slideData = [
  {
    id: 1,
    src: '/hero/hero1.webp',
    link: '/',
    title1: '함께 떠나는',
    title2: '여행코스',
    description: '지금 제일 인기 있는 여행모임을 만나보세요.',
  },
  {
    id: 2,
    src: '/hero/hero3.webp',
    link: '/',
    title1: '이번달 인기',
    title2: '여행지기는 누구?',
    description: '지금 제일 인기 있는 여행지기를 만나보세요.',
  },
  {
    id: 3,
    src: '/hero/hero2.webp',
    link: '/',
    title1: '여행자들의',
    title2: '특별한 HOLIDAY',
    description: '다양한 사람들의 여행기를 만나보세요!',
  },
];
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.realIndex);
  };

  return (
    <section className="relative flex w-full pt-20">
      <div className="absolute inset-0 z-0 w-full overflow-hidden">
        <Image
          src={slideData[currentSlide]?.src || '/hero1.png'}
          alt="배경효과 이미지"
          width={800}
          height={800}
          quality={1}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1400px"
          className="h-full w-full scale-110 object-cover blur-lg"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-white via-90% to-white" />
      </div>
      <Swiper
        spaceBetween={10}
        centeredSlides
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        grabCursor
        onSlideChange={handleSlideChange}
        style={{ width: '100%', height: 'auto' }}
        className="max-w-[1480px]"
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <HeroImage
              link={slide.link}
              src={slide.src}
              title1={slide.title1}
              title2={slide.title2}
              description={slide.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default HeroSection;
