'use client';

import { getCurrentDate } from '@/lib/requests';
import React, { Dispatch, ReactElement, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

interface ContextType {
  currentDate: Date;
}

const globalContext = createContext<ContextType>({ currentDate: new Date() });

const GlobalStoreProvider = ({ children }: { children: ReactElement }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchDate = async () => {
      const date = await getCurrentDate();

      setCurrentDate(date?.currentDate ? new Date(date.currentDate) : new Date());
    };

    fetchDate();
  }, []);

  return <globalContext.Provider value={{ currentDate }}>{children}</globalContext.Provider>;
};

export default GlobalStoreProvider;

export const useGlobalStore = () => {
  return useContext(globalContext);
};
