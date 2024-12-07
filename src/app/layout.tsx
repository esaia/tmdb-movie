import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Head from 'next/head';

// Base styles for media player and provider (~400B).
import '@vidstack/react/player/styles/base.css';

export const metadata: Metadata = {
  title: {
    default: 'Movies',
    template: `%s | Movies`,
  },
};

const myFont = localFont({
  src: '../../assets/fonts/Geologica-Regular.ttf',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="customScrollbar">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <body className={`${myFont.className} overflow-x-hidden bg-black text-white`}>
        <>
          <div className="portal"></div>
          <Header />
          {children}
          <Footer />
        </>
      </body>
    </html>
  );
}
