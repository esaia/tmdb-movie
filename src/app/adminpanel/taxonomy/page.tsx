'use client';

import Portal from '@/src/components/adminPanel/Portal';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import AddTaxonomy from '@/src/components/adminPanel/AddTaxonomy';
import CategoryTable from '@/src/components/adminPanel/CategoryTable';
import { useAdminPanel } from '@/src/components/context/AdminPanelProvider';

const page = () => {
  const { openModalId, setOpenModalId } = useAdminPanel();

  return (
    <>
      <CategoryTable />

      {openModalId === 2 &&
        createPortal(
          <Portal closeModal={() => setOpenModalId(-1)}>
            <>
              <AddTaxonomy onClose={() => setOpenModalId(-1)} />
            </>
          </Portal>,
          document.querySelector('.portal') as HTMLDivElement,
        )}
    </>
  );
};

export default page;
