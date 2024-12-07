import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Head from 'next/head';

// Base styles for media player and provider (~400B).
import '@vidstack/react/player/styles/base.css';
import GlobalStoreProvider from '../components/context/GlobaldataProvider';

// Font files can be colocated inside of `pages`

export const metadata: Metadata = {
  title: {
    default: 'ქრისტიანული ფილმები',
    template: `%s | ქრისტიანული ფილმები`,
  },
  description: 'გთავაზობთ ქრისტიანულ ფილმებს ქართულად. kristianuli filmebi kartulad',
  keywords: 'ქრისტიანული ფილმები, ქრისტიანული ფილმები ქართულად, ფილმები, ქართულად, ფილმები ქართულად',
  alternates: { canonical: 'http://qmovies.net/' },
};

const myFont = localFont({
  src: '../../assets/fonts/NotoSansGeorgian-VariableFont_wdth,wght.ttf',
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
        <GlobalStoreProvider>
          <>
            <div className="portal"></div>
            <Header />
            {children}
            <Footer />
          </>
        </GlobalStoreProvider>
      </body>
    </html>
  );
}
