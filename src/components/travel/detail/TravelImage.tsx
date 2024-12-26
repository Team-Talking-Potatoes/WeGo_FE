import DateOverTag from '@/components/common/tag/DateOverTag';
import Image from 'next/image';

interface Props {
  image: string;
  name: string;
  endAt: string;
  registrationEnd: string;
}

const TravelImage = ({ image, name, endAt, registrationEnd }: Props) => {
  const now = new Date();
  const endDate = new Date(registrationEnd);
  return (
    <figure className="relative flex h-[250px] w-[500px] flex-shrink-0 flex-col overflow-hidden md:mt-5 md:h-full md:w-auto">
      <Image
        src={image}
        alt={`${name} 이미지`}
        height={760}
        width={500}
        className="h-full w-full object-cover"
      />
      {now >= endDate && <DateOverTag endAt={endAt} />}
    </figure>
  );
};

export default TravelImage;
