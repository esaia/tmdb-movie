'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import HeaderSearch from './UiComponents/HeaderSearch';
import { usePathname } from 'next/navigation';
import { RiMovie2Line } from 'react-icons/ri';
import { MdMovieCreation, MdOutlineLocalMovies } from 'react-icons/md';
import Logo from './UiComponents/SVG/Logo';
import { useDetectClickOutside } from 'react-detect-click-outside';
const MobHeader = () => {
  const [windowScrollY, setWindowScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const path = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toogleMobileMenu = () => {
    setShowMenu(!showMenu);
    if (!mobileMenuRef.current) return;
    if (!showMenu) {
      mobileMenuRef.current.classList.remove('scaleOut');
      mobileMenuRef.current.classList.add('scaleIn');
    } else {
      mobileMenuRef.current.classList.remove('scaleIn');
      mobileMenuRef.current.classList.add('scaleOut');
    }
  };

  const openMenu = () => {
    setShowMenu(true);
    if (!mobileMenuRef.current) return;

    mobileMenuRef.current.classList.remove('scaleOut');
    mobileMenuRef.current.classList.add('scaleIn');
  };

  const closeMenu = () => {
    setShowMenu(false);
    if (!mobileMenuRef.current) return;

    mobileMenuRef.current.classList.remove('scaleIn');
    mobileMenuRef.current.classList.add('scaleOut');
  };

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

  useEffect(() => {
    if (showSearch) {
      setHasMounted(true);
    }
  }, [showSearch]);

  const mobileMenuTarget = useDetectClickOutside({
    onTriggered: () => {
      if (showMenu) closeMenu();
    },
  });

  return (
    <div className="fixed top-0 z-20 w-full lg:hidden" ref={mobileMenuTarget}>
      <div
        className={`flex items-center justify-between border-b-[1px] border-transparent bg-black px-5 py-4 transition-all duration-500 ${
          windowScrollY > 50 || showMenu ? 'border-b-secondary/40 bg-black' : 'bg-transparent'
        }`}
      >
        <div className="cursor-pointer rounded-full p-3 text-xl hover:bg-gray-800" onClick={() => setShowSearch(true)}>
          <FaSearch />
        </div>
        <Link href={'/'} aria-label="Logo">
          <Logo />
        </Link>
        <div className="cursor-pointer rounded-full p-3 text-xl hover:bg-gray-800" onClick={toogleMobileMenu}>
          <GiHamburgerMenu />
        </div>
      </div>

      {/* {showSearch && ( */}
      <div
        className={`absolute left-0 top-0 z-50 w-full scale-y-0 px-3 pt-[7px] ${hasMounted ? (showSearch ? 'scaleIn' : 'scaleOut') : ''}`}
      >
        <HeaderSearch onClose={() => setShowSearch(false)} />
      </div>
      {/* )} */}

      <div
        className="absolute left-0 top-[77px] w-full origin-top scale-0 bg-primaryBlack p-3 uppercase"
        ref={mobileMenuRef}
        onClick={e => e.stopPropagation()}
      >
        <Link
          className={`text flex items-center gap-2 px-4 py-6 hover:text-secondary ${path === '/' && 'text-secondary'}`}
          onClick={closeMenu}
          href={'/'}
        >
          <RiMovie2Line />
          მთავარი
        </Link>
        <Link
          className={`text flex items-center gap-2 px-4 py-6 hover:text-secondary ${
            path === '/movie' && 'text-secondary'
          }`}
          onClick={closeMenu}
          href={'/movie'}
        >
          <MdMovieCreation />
          ფილმები
        </Link>

        <Link
          className={`text flex items-center gap-2 px-4 py-6 hover:text-secondary ${
            path === '/serie' && 'text-secondary'
          }`}
          onClick={closeMenu}
          href={'/serie'}
        >
          <MdOutlineLocalMovies />
          სერიალები
        </Link>
      </div>
    </div>
  );
};

export default MobHeader;
