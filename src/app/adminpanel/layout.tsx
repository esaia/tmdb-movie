import Sidebar from '@/src/components/adminPanel/Sidebar';
import AdminPanelProvider from '@/src/components/context/AdminPanelProvider';
import React, { ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';

const layout = ({ children }: { children: ReactElement }) => {
  return (
    <AdminPanelProvider>
      <div className="mainContainer flex pb-20 pt-40">
        <Toaster position="top-right" reverseOrder={false} />

        <div className="min-w-fit">
          <Sidebar />
        </div>
        <div className="flex-1 pl-10">{children}</div>
      </div>
    </AdminPanelProvider>
  );
};

export default layout;
