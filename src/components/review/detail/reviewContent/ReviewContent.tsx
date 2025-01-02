import LocationIcon from '@/assets/icon/location_18px.svg';

interface Props {
  title: string;
  content: string;
  travelLocation: string;
}

const ReviewContent = ({ title, content, travelLocation }: Props) => {
  return (
    <div className="mt-6 text-label-strong xl:h-[300px]">
      <p className="body-3-sb flex items-center gap-1.5 text-gray-500">
        <LocationIcon />
        {travelLocation}
      </p>

      <h2 className="title-4-b mb-3 mt-1.5">{title}</h2>

      <p className="body-1-r mt-2 whitespace-pre-line custom-scrollbar xl:max-h-[230px] xl:overflow-y-scroll xl:pr-4">
        {content}
      </p>
    </div>
  );
};

export default ReviewContent;
