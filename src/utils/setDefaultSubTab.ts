import { MainTab as MainTabType, SubTab as SubTabType } from '@/@types/mypage';

const setDefaultSubTab = (
  tab: MainTabType,
  setSelectedSubTab: (subTab: SubTabType) => void,
) => {
  if (tab === 'myTravel') {
    setSelectedSubTab('upcomming');
  }
  if (tab === 'myReview') {
    setSelectedSubTab('writable');
  }
  if (tab === 'mySelfTravel') {
    setSelectedSubTab('mySelfTravel');
  }
  return null;
};

export { setDefaultSubTab };
