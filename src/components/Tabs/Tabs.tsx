import React from 'react';
import { Tab } from './Tab';
import { TabItem } from './TabItem';

type TabPanelProps = {
  hash: string;
  title: string;
  children: React.ReactNode;
};

type TabsProps = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  children: React.ReactElement<TabPanelProps>[];
};

const Tabs = ({ activeIndex, setActiveIndex, children }: TabsProps) => {
  return (
    <div>
      <Tab>
        {React.Children.map(children, (child, index) => (
          <TabItem
            key={index}
            title={child.props.title}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            hash={child.props.hash}
          />
        ))}
      </Tab>
      <div>{children[activeIndex]}</div>
    </div>
  );
};

const Panel = ({ children }: TabPanelProps) => <>{children}</>;

Tabs.Panel = Panel;

const MemoizedTabs = React.memo(Tabs) as unknown as typeof Tabs & {
  Panel: typeof Panel;
};
MemoizedTabs.Panel = Panel;

export { MemoizedTabs as Tabs };
