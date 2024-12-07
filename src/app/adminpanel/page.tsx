'use client';
import Portal from '@/src/components/adminPanel/Portal';
import React, { Suspense } from 'react';
import { createPortal } from 'react-dom';
import MoviesTable from '@/src/components/adminPanel/MoviesTable';
import AddMovie from '@/src/components/adminPanel/AddMovie';
import { useAdminPanel } from '@/src/components/context/AdminPanelProvider';

const page = () => {
  const { openModalId, setOpenModalId } = useAdminPanel();

  return (
    <>
      <Suspense>
        <MoviesTable />
      </Suspense>
      {openModalId === 1 &&
        createPortal(
          <Portal closeModal={() => setOpenModalId(-1)}>
            <>
              <AddMovie setActiveIndex={() => setOpenModalId(-1)} />
            </>
          </Portal>,
          document.querySelector('.portal') as HTMLDivElement,
        )}
    </>
  );
};

export default page;
