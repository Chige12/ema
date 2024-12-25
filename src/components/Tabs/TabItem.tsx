import React from 'react';

type Props = {
  title: string;
  active: boolean;
  url: string;
};

const active_class = 'bg-primary-500 text-white';
const inactive_class = 'bg-white text-primary-500';

const TabItem = ({ title, active, url }: Props) => {
  return (
    <a
      className={`${active ? active_class : inactive_class} w-full text-center p-1 border-4 border-b-0 rounded-t-2xl border-primary-500`}
      href={`${url}`}
    >
      {title}
    </a>
  );
};

const MemoizedTabItem = React.memo(TabItem);
export { MemoizedTabItem as TabItem };
