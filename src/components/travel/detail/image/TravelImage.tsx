import DateOverTag from '@/components/common/tag/DateOverTag';
import Image from 'next/image';

interface Props {
  image: string;
  name: string;
  endAt: string;
  registrationEnd: string;
}

const TravelImage = ({ image, name, endAt, registrationEnd }: Props) => {
  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
  };
  const now = new Date();
  const endDate = parseDate(registrationEnd);
  return (
    <figure className="relative max-h-[277px] w-full overflow-hidden md:mt-5 md:aspect-[309/277] md:max-h-[392px] md:rounded">
      <Image
        src={image}
        alt={`${name} 이미지`}
        height={760}
        width={500}
        className="h-full w-full object-contain"
      />
      {now >= endDate && <DateOverTag endAt={endAt} />}
    </figure>
  );
};

export default TravelImage;
