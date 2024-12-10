import { MainTab } from '@/@types/mypage';

const setMypageBarPosition = (tab: MainTab) => {
  if (tab === 'myTravel') return 'left-0 w-[59px]';
  if (tab === 'myReview') return 'left-[79px] w-[60px]';
  if (tab === 'mySelfTravel') return 'left-[159px] w-[91px]';
  return '';
};

export default setMypageBarPosition;
