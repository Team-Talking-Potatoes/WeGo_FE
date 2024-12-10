import cn from '@/utils/cn';
import { MainTab as MainTabType, SubTab as SubTabType } from '@/@types/mypage';
import setMypageBarPosition from '@/utils/setMypageBarPosition';
import { MY_PAGE_TABS_NAME } from '@/constants/mypage';
import { setDefaultSubTab } from '@/utils/setDefaultSubTab';

interface Props {
  selectedTab: MainTabType;
  setSelectedTab: (tab: MainTabType) => void;
  setSelectedSubTab: (subTab: SubTabType) => void;
}

const MainTab = ({ selectedTab, setSelectedTab, setSelectedSubTab }: Props) => {
  return (
    <div className="relative mx-auto">
      <ul className="heading-1-sb flex w-[335px] gap-5 text-label-alternative">
        {['myTravel', 'myReview', 'mySelfTravel'].map((tab) => (
          <li
            key={tab}
            className={cn({
              'heading-1-b text-label-normal': selectedTab === tab,
            })}
          >
            <button
              type="button"
              onClick={() => {
                setSelectedTab(tab as MainTabType);
                setDefaultSubTab(tab as MainTabType, setSelectedSubTab);
              }}
            >
              {MY_PAGE_TABS_NAME[tab as MainTabType]}
            </button>
          </li>
        ))}
      </ul>

      <div
        className={`absolute -bottom-2.5 h-[3px] bg-label-normal transition-all duration-150 ease-in-out ${setMypageBarPosition(selectedTab)}`}
      />
    </div>
  );
};

export default MainTab;
