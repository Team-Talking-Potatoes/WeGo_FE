import FormHeader from '@/components/common/formheader/FormHeader';
import TravelContents from '@/components/travel/TravelContents';
import TravelInfo from '@/components/travel/TravelInfo';

const TravelDetail = () => {
  return (
    <article>
      <FormHeader title="여행상세" />
      <TravelContents />
      <div className="flex gap-5 border-b px-5 pb-2 text-label-alternative">
        <span>여행상세</span>
        <span>여행일정 </span>
      </div>
      <TravelInfo />
    </article>
  );
};
export default TravelDetail;
