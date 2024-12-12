import { SubTab as SubTabType } from '@/@types/mypage';
import Upcomming from './content/myTravel/Upcomming';
import PastTravel from './content/myTravel/PastTravel';
import CheckedTravel from './content/myTravel/CheckedTravel';
import Writable from './content/myReview/Writable';
import Written from './content/myReview/Written';

interface Props {
  selectedSubTab: SubTabType;
}

const TabContents = ({ selectedSubTab }: Props) => {
  if (selectedSubTab === 'upcomming') {
    return <Upcomming />;
  }
  if (selectedSubTab === 'pastTravel') {
    return <PastTravel />;
  }
  if (selectedSubTab === 'checkedTravel') {
    return <CheckedTravel />;
  }
  if (selectedSubTab === 'writable') {
    return <Writable />;
  }
  if (selectedSubTab === 'written') {
    return <Written />;
  }
  if (selectedSubTab === 'mySelfTravel') {
    return <div>내가 만든 여행</div>;
  }

  return null;
};

export default TabContents;
