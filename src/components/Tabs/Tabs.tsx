import React, { useMemo } from 'react';
import { Tab } from './Tab';
import { TabItem } from './TabItem';

type TabPanelProps = {
  hash: string;
  title: string;
  children: React.ReactNode;
};

type TabsProps = {
  children: React.ReactElement<TabPanelProps>[];
};

const Tabs = ({ children }: TabsProps) => {
  const initialIndex = useMemo(() => {
    const hash = window.location.hash;
    switch (hash) {
      case '#gallery':
        return 1;
      default:
        return 0;
    }
  }, []);

  const [activeIndex, setActiveIndex] = React.useState(initialIndex);
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
