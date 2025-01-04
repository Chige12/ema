import React from 'react';
import { IconButton } from '@/components/IconButton';

export const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

type Props = {
  direction: Direction;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Switcher = ({ direction, onClick }: Props) => {
  const side = direction === DIRECTION.LEFT ? 'left-0 rotate-180' : 'right-0';
  return (
    <div className={`absolute top-0 bottom-0 ${side} my-auto w-10 h-10`}>
      <IconButton onClick={onClick}>
        <svg
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 1L9 7L3 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>
    </div>
  );
};

const MemoizedSwitcher = React.memo(Switcher);
export { MemoizedSwitcher as Switcher };
