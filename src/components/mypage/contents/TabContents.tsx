import { SubTab as SubTabType } from '@/@types/mypage';
import Upcomming from './content/myTravel/Upcomming';
import PastTravel from './content/myTravel/PastTravel';
import CheckedTravel from './content/myTravel/CheckedTravel';

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
    return <div>작성가능한</div>;
  }
  if (selectedSubTab === 'written') {
    return <div>작성한</div>;
  }
  if (selectedSubTab === 'mySelfTravel') {
    return <div>내가 만든 여행</div>;
  }

  return null;
};

export default TabContents;
