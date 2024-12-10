'use client';

import { useState } from 'react';
import { SelectedTab } from '@/@types/mypage';
import HorizontalDivider from '@/components/common/divider/HorizontalDivider';
import MainTab from './MainTab';

const TabSection = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>('myTravel');

  return (
    <section className="flex flex-col">
      <MainTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <HorizontalDivider className="mt-2.5" />
    </section>
  );
};

export default TabSection;
