import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const IconButton = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="border-gray-300 w-full h-full rounded-full bg-primary-500 flex items-center justify-center filter active:brightness-110"
    >
      {children}
    </button>
  );
};

const MemoizedIconButton = React.memo(IconButton);
export { MemoizedIconButton as IconButton };
