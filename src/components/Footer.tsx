import React from 'react';
import Logo from '@/src/components/UiComponents/SVG/Logo';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="rounded-lg bg-primaryBlack shadow">
      <div className="mainContainer m-auto w-full max-w-max_width py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href={'/'} className="text-xl font-bold [&_p]:text-center md:[&_p]:text-start" aria-label="Logo">
            <Logo />
          </Link>

          <ul className="flex flex-wrap items-center text-sm font-medium uppercase text-gray-400 sm:mb-0">
            <li>
              <Link href="/" className="me-4 hover:underline md:me-6">
                Home
              </Link>
            </li>
            <li>
              <Link href="/movie" className="me-4 hover:underline md:me-6">
                Movies{' '}
              </Link>
            </li>
            <li>
              <Link href="/serie" className="me-4 hover:underline md:me-6">
                Series
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <span className="block text-sm text-gray-400 sm:text-center">© 2023 TMDB Movies </span>
          <Image src="/images/tmdb.svg" alt="tmdb" width={100} height={100} />
          <span className="text-gray-400">
            Created With 🤍 By{' '}
            <Link href={'https://www.facebook.com/esaia.gafrindashvili/'} target="_blank">
              <span className="text-secondary/80 underline transition-all hover:text-secondary">Esaia</span>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
