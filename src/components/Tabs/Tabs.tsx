import { usePathname } from 'next/navigation';
import React from 'react';
import { TABS } from '@/lib/tabHelpers';
import { Tab } from './Tab';
import { TabItem } from './TabItem';

const Tabs = () => {
  const pathname = usePathname();

  return (
    <Tab>
      {TABS.map((tab) => (
        <TabItem
          key={tab.title}
          title={tab.title}
          active={pathname === tab.url}
          url={tab.url}
        />
      ))}
    </Tab>
  );
};

const MemoizedTabs = React.memo(Tabs);

export { MemoizedTabs as Tabs };
