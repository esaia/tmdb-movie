'use client';
import Portal from '@/src/components/adminPanel/Portal';
import React, { Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useAdminPanel } from '@/src/components/context/AdminPanelProvider';
import AddSeries from '@/src/components/adminPanel/AddSeries';
import SeriesTable from '@/src/components/adminPanel/SeriesTable';

const page = () => {
  const { openModalId, setOpenModalId } = useAdminPanel();

  return (
    <>
      <Suspense>
        <SeriesTable />
      </Suspense>
      {openModalId === 3 &&
        createPortal(
          <Portal closeModal={() => setOpenModalId(-1)}>
            <>
              <AddSeries setActiveIndex={() => setOpenModalId(-1)} />
            </>
          </Portal>,
          document.querySelector('.portal') as HTMLDivElement,
        )}
    </>
  );
};

export default page;
