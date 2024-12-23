import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Tab = ({ children }: Props) => {
  return (
    <div className="text-center border-b-4 border-primary-500 pt-4">
      <div className="max-w-3xl mx-auto flex justify-between gap-2 px-6">{children}</div>
    </div>
  );
};

const MemoizedTab = React.memo(Tab);
export { MemoizedTab as Tab };
