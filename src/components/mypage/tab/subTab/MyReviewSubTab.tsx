import { SubTab as SubTabType } from '@/@types/mypage';
import { MY_PAGE_TABS_NAME } from '@/constants/mypage';
import cn from '@/utils/cn';

interface Props {
  selectedSubTab: SubTabType;
  setSelectedSubTab: (subTab: SubTabType) => void;
}

const MyReviewSubTab = ({ selectedSubTab, setSelectedSubTab }: Props) => {
  return (
    <div
      className="relative mb-4 w-full max-w-[335px] md:max-w-[688px] xl:max-w-[1400px]"
      data-testid="myReviewSubTab"
    >
      <ul className="body-2-r flex divide-x text-label-alternative">
        {['writable', 'written'].map((subTab) => (
          <li
            key={subTab}
            className={cn({
              'pr-2': subTab === 'writable',
              'px-2': subTab === 'written',
              'body-2-sb text-label-normal': selectedSubTab === subTab,
            })}
          >
            <button
              type="button"
              disabled={selectedSubTab === subTab}
              onClick={() => setSelectedSubTab(subTab as SubTabType)}
            >
              {MY_PAGE_TABS_NAME[subTab as SubTabType]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviewSubTab;
