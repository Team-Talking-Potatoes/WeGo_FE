import cn from '@/utils/cn';
import { SelectedTab } from '@/@types/mypage';
import setMypageBarPosition from '@/utils/setMypageBarPosition';

interface Props {
  selectedTab: SelectedTab;
  setSelectedTab: (tab: SelectedTab) => void;
}

const MainTab = ({ selectedTab, setSelectedTab }: Props) => {
  return (
    <div className="relative mx-auto">
      <ul className="heading-1-sb flex w-[335px] gap-5 text-label-alternative">
        <li
          className={cn({
            'heading-1-b text-label-normal': selectedTab === 'myTravel',
          })}
        >
          <button type="button" onClick={() => setSelectedTab('myTravel')}>
            나의 여행
          </button>
        </li>
        <li
          className={cn({
            'heading-1-b text-label-normal': selectedTab === 'myReview',
          })}
        >
          <button type="button" onClick={() => setSelectedTab('myReview')}>
            나의 리뷰
          </button>
        </li>
        <li
          className={cn({
            'heading-1-b text-label-normal': selectedTab === 'mySelfTravel',
          })}
        >
          <button type="button" onClick={() => setSelectedTab('mySelfTravel')}>
            내가 만든 여행
          </button>
        </li>
      </ul>

      <div
        className={`absolute -bottom-2.5 h-[3px] bg-label-normal transition-all duration-200 ease-in-out ${setMypageBarPosition(selectedTab)}`}
      />
    </div>
  );
};

export default MainTab;
