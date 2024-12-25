import React from 'react';

type Props = {
  title: string;
  active: boolean;
  onClick: () => void;
  hash: string;
};

const active_class = 'bg-primary-500 text-white';
const inactive_class = 'bg-white text-primary-500';

const TabItem = ({ title, active, onClick, hash }: Props) => {
  return (
    <a
      className={`${active ? active_class : inactive_class} w-full text-center p-1 border-4 border-b-0 rounded-t-2xl border-primary-500`}
      onClick={onClick}
      href={`${hash}`}
    >
      {title}
    </a>
  );
};

const MemoizedTabItem = React.memo(TabItem);
export { MemoizedTabItem as TabItem };
