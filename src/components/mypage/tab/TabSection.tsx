'use client';

import { useState } from 'react';
import { MainTab as MainTabType, SubTab as SubTabType } from '@/@types/mypage';

import HorizontalDivider from '@/components/common/divider/HorizontalDivider';

import SubTab from './SubTab';
import MainTab from './MainTab';
import TabContents from '../contents/TabContents';

const TabSection = () => {
  const [selectedTab, setSelectedTab] = useState<MainTabType>('myTravel');
  const [selectedSubTab, setSelectedSubTab] = useState<SubTabType>('upcomming');

  return (
    <section className="flex flex-col">
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
