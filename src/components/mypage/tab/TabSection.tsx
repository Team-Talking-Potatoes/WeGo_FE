'use client';

import { useState } from 'react';
import { MainTab as MainTabType, SubTab as SubTabType } from '@/@types/mypage';

import HorizontalDivider from '@/components/common/divider/HorizontalDivider';

import SubTab from './SubTab';
import MainTab from './MainTab';
import TabContents from '../contents/TabContents';

jest.mock('@/queries/travel/useGetMyTravel', () => ({
  useMySelfTravel: () => ({
    isLoading: false,
    data: {
      total: 1,
      travels: [
        {
          travelId: 11,
          travelName: '도쿄에서 즐기는 미식여행',
          expectedTripCost: 1000000,
          travelMateCount: 11,
          isDomestic: true,
          travelStatus: '예정',
          location: '도쿄시',
          image: '/test/travel/test1.jpg',
          startAt: '2024.12.11',
          endAt: '2024.12.11',
          maxTravelMateCount: 12,
          currentTravelMateCount: 11,
        },
      ],
    },
  }),
  useWritableTravel: () => ({
    isLoading: false,
    data: {
      content: [],
      total: 0,
      currentPage: 1,
      hasNext: false,
    },
  }),
  useCheckedTravel: () => ({
    isLoading: false,
    data: {
      total: 3,
      travels: [],
    },
  }),
  usePastTravel: () => ({
    isLoading: false,
    data: {
      total: 3,
      travels: [],
    },
  }),
  useUpcommingTravel: () => ({
    isLoading: false,
    data: {
      total: 3,
      travels: [],
    },
  }),
}));

const TabSection = () => {
  const [selectedTab, setSelectedTab] = useState<MainTabType>('myTravel');
  const [selectedSubTab, setSelectedSubTab] = useState<SubTabType>('upcomming');

  return (
    <section className="mb-[80px] flex min-h-[650px] flex-col items-center">
      <MainTab
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setSelectedSubTab={setSelectedSubTab}
      />
      <HorizontalDivider className="mb-6 mt-2.5" />
      <SubTab
        selectedTab={selectedTab}
        selectedSubTab={selectedSubTab}
        setSelectedSubTab={setSelectedSubTab}
      />
      <TabContents selectedSubTab={selectedSubTab} />
    </section>
  );
};

export default TabSection;
