import Image from 'next/image';
import Link from 'next/link';

const HeroImage = ({
  link,
  src,
  title1,
  title2,
  description,
}: {
  link: string;
  src: string;
  title1: string;
  title2: string;
  description: string;
}) => {
  return (
    <Link
      href={link}
      className="relative z-10 mx-5 flex h-full max-h-[500px] min-h-[360px] items-center justify-center overflow-hidden rounded-lg md:mx-10"
    >
      <Image
        src={src}
        alt="여행 모임 홍보 이미지"
        width={1400}
        height={500}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-16 left-8 flex flex-col gap-2.5 text-white md:bottom-16">
        <div className="title-1-b [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.3)] md:flex">
          <div className="whitespace-pre">{`${title1} `}</div>
          <div>{title2}</div>
        </div>
        <div className="body-2-r">{description}</div>
      </div>
    </Link>
  );
};

export default HeroImage;
