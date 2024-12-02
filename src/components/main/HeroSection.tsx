import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="flex h-[440px] items-center justify-center pt-20">
      <Image
        src="/test.png"
        alt="사람들이 다리를 건너는 모습, '함께 떠나는 여행코스. 지금 제일 인기 있는 여행모임을 만나보세요.'라는 문구가 포함된 이미지"
        width={335}
        height={360}
        className="rounded-lg"
      />
    </section>
  );
};
export default HeroSection;
