'use client';

import React, { Dispatch, ReactElement, SetStateAction, createContext, useContext, useState } from 'react';

interface ContextType {
  openModalId: number;
  setOpenModalId: Dispatch<SetStateAction<number>>;
}

const adminpanelConext = createContext<ContextType>({ openModalId: 0, setOpenModalId: () => {} });

const AdminPanelProvider = ({ children }: { children: ReactElement }) => {
  const [openModalId, setOpenModalId] = useState(0);

  return <adminpanelConext.Provider value={{ openModalId, setOpenModalId }}>{children}</adminpanelConext.Provider>;
};

export default AdminPanelProvider;

export const useAdminPanel = () => {
  return useContext(adminpanelConext);
};
