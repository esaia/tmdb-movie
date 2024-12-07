import MoviesTable from '@/src/components/adminPanel/MoviesTable';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <Suspense>
      <MoviesTable />
    </Suspense>
  );
};

export default page;
