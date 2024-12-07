'use client';

import { logout } from '@/lib/requests';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useAdminPanel } from '@/src/components/context/AdminPanelProvider';
import Link from 'next/link';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { setOpenModalId } = useAdminPanel();

  const logoutUser = async () => {
    try {
      await logout();
      router.push('/adminpanel/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-w-52 flex-col gap-4">
      <Link href={'/adminpanel/'}>
        <TabTitle title="ფილმები" />
      </Link>
      <Link href={'/adminpanel/series'}>
        <TabTitle title="სერიალები" />
      </Link>
      <Link href={'/adminpanel/taxonomy'}>
        <TabTitle title="კატეგორიები" />
      </Link>
      <Link href={'/adminpanel/archived'}>
        <TabTitle title="წაშლილი ფილმები" />
      </Link>

      {pathname === '/adminpanel' && <MultyButton title="დაამატე ფილმი" onClick={() => setOpenModalId(1)} />}
      {pathname === '/adminpanel/series' && <MultyButton title="დაამატე სერიალი" onClick={() => setOpenModalId(3)} />}
      {pathname === '/adminpanel/taxonomy' && (
        <MultyButton title="დაამატე კატეგორია" onClick={() => setOpenModalId(2)} />
      )}

      <button className="rounded-lg bg-secondary/50 p-3 text-sm" onClick={logoutUser}>
        გამოსვლა
      </button>
    </div>
  );
};

export default Sidebar;

const TabTitle = ({ title, onClick, active }: { title: string; onClick?: () => void; active?: boolean }) => {
  return (
    <p
      onClick={onClick}
      className="cursor-pointer rounded-lg border-[1px] border-transparent p-3 text-sm transition-all duration-700 hover:bg-primary/80"
    >
      {title}
    </p>
  );
};

const MultyButton = ({ title, onClick, active }: { title: string; onClick?: () => void; active?: boolean }) => {
  return (
    <p
      onClick={onClick}
      className="cursor-pointer rounded-lg border-[1px] border-transparent p-3 text-sm text-secondary transition-all duration-700"
    >
      {title}
    </p>
  );
};
