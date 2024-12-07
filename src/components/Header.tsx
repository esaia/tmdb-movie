'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HeaderSearch from '@/src/components/UiComponents/HeaderSearch';
import { MdMovieCreation, MdOutlineLocalMovies } from 'react-icons/md';
import { RiMovie2Line } from 'react-icons/ri';
import MobHeader from './MobHeader';
import { usePathname } from 'next/navigation';
import Logo from './UiComponents/SVG/Logo';

const Header = () => {
  const [windowScrollY, setWindowScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = (e: Event) => {
      setWindowScrollY(window.scrollY);
    };

    setWindowScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 z-40 w-full origin-top border-b-[1px] border-transparent transition-all duration-500 ${
        windowScrollY > 50
          ? 'border-b-secondary/40 bg-black/80 py-3 backdrop-blur-sm [&_.logo]:scale-90'
          : 'bg-transparent py-6 [&_.logo]:scale-100'
      }`}>
      <div className="mainContainer top-0 m-auto hidden w-full max-w-max_width justify-between lg:flex">
        <div className="logo flex origin-left items-center justify-center transition-all duration-300">
          <Link href={'/'} className="text-xl font-bold" aria-label="Logo">
            <Logo />
          </Link>
        </div>
        <div className="ml-3 flex items-center uppercase md:space-x-3 lg:space-x-6">
          <HeaderSearch />

          <HeaderNavLink to="/">
            <RiMovie2Line />
            <p className="py-4">Home</p>
          </HeaderNavLink>

          <HeaderNavLink to="/movie">
            <MdMovieCreation />
            <p className="py-4">Movies</p>
          </HeaderNavLink>

          <HeaderNavLink to="/serie">
            <MdOutlineLocalMovies />
            <p className="py-4">Series</p>
          </HeaderNavLink>
        </div>
      </div>

      <MobHeader />
    </div>
  );
};

export default Header;

const HeaderNavLink = ({ children, to }: { children: React.ReactNode; to: string }) => {
  const path = usePathname();

  return (
    <>
      <Link
        className={`text flex items-center justify-center gap-2 transition-all duration-300 hover:text-secondary ${
          path === to && 'text-secondary'
        }`}
        href={to}>
        {children}
      </Link>
    </>
  );
};
