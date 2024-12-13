import cn from '@/utils/cn';
import { MainTab as MainTabType } from '@/@types/mypage';

interface Props {
  selectedTab: MainTabType;
}

const Highlight = ({ selectedTab }: Props) => {
  return (
    <div
      className={cn(
        'absolute -bottom-2.5 h-[3px] bg-label-normal transition-all duration-150 ease-in-out',
        { 'left-0 w-[59px]': selectedTab === 'myTravel' },
        { 'left-[79px] w-[60px]': selectedTab === 'myReview' },
        { 'left-[159px] w-[91px]': selectedTab === 'mySelfTravel' },
      )}
    />
  );
};

export default Highlight;
