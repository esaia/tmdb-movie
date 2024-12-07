'use client';

import { redirect, RedirectType } from 'next/navigation';
import React from 'react';

const Page = () => {
  redirect('/movie');
  return <div className="h-svh"></div>;
};

export default Page;
