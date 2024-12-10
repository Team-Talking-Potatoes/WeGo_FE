import { MainTab as MainTabType, SubTab as SubTabType } from '@/@types/mypage';
import MyTravelSubTab from './subTab/MyTravelSubTab';
import MyReviewSubTab from './subTab/MyReviewSubTab';

interface Props {
  selectedTab: MainTabType;
  selectedSubTab: SubTabType;
  setSelectedSubTab: (subTab: SubTabType) => void;
}

const SubTab = ({ selectedTab, selectedSubTab, setSelectedSubTab }: Props) => {
  if (selectedTab === 'myTravel') {
    return (
      <MyTravelSubTab
        selectedSubTab={selectedSubTab}
        setSelectedSubTab={setSelectedSubTab}
      />
    );
  }

  if (selectedTab === 'myReview') {
    return (
      <MyReviewSubTab
        selectedSubTab={selectedSubTab}
        setSelectedSubTab={setSelectedSubTab}
      />
    );
  }

  return null;
};

export default SubTab;
