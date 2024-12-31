'use client';

import { createContext, useState } from 'react';
import { sortEma } from '@/lib/emaListHelpers';
import { Ema } from '@/types/ema';

type EmaContextType = {
  emaList: Ema[];
  setEmaList: React.Dispatch<React.SetStateAction<Ema[]>>;
  addEma: (ema: Ema) => void;
};

export const EmaContext = createContext<EmaContextType>({
  emaList: [],
  setEmaList: () => {},
  addEma: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TaskListProvider = ({ children }: Props) => {
  const [emaList, setEmaList] = useState<Ema[]>([]);

  const addEma = (ema: Ema) => {
    setEmaList((prev) => sortEma([...prev, ema]));
  };

  return (
    <EmaContext.Provider value={{ emaList, setEmaList, addEma }}>
      {children}
    </EmaContext.Provider>
  );
};
