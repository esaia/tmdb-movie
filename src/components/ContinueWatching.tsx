'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { MdTheaters } from 'react-icons/md';
import { continueWatchingType, MovieType } from '@/types';
import Link from 'next/link';
import { generateSlug } from '@/lib/helpers';

const ContinueWatching = () => {
  const [isClient, setIsClient] = useState(false);
  const [movies, setMovies] = useState<MovieType[]>();

  const calculatePercentage = (part: number, total: number) => {
    if (total === 0) return 0;
    const procentage = Math.round((part / total) * 100);

    return `${procentage || 0}%`;
  };

  // useEffect(() => {
  //   setIsClient(true);
  //   const continue_watching_movies = localStorage.getItem('continue_watching_movies');
  //   const continue_watching_series = localStorage.getItem('continue_watching_series');

  //   if (continue_watching_movies || continue_watching_series) {
  //     setMovies(
  //       (
  //         [
  //           ...JSON.parse(continue_watching_movies || '[]'),
  //           ...JSON.parse(continue_watching_series || '[]'),
  //         ] as continueWatchingType[]
  //       ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  //     );
  //   }
  // }, []);

  return (
    <>
      {isClient && movies && (
        <div className="mainContainer m-auto flex max-w-max_width flex-col gap-5 py-5 transition-all duration-500 lg:py-10">
          <div className="flex items-center gap-3">
            <div className="title rounded-full bg-secondary p-2 lg:p-3">
              <MdTheaters />
            </div>
            <h3 className="title uppercase">განაგრძე ყურება</h3>
          </div>

          <Swiper slidesPerView={'auto'} speed={800} className="!h-fit !w-full !overflow-visible">
            {movies.length &&
              movies.slice(0, 10).map(movie => {
                return (
                  <SwiperSlide className="relative !w-[260px] cursor-pointer pr-2 lg:!w-[440px] lg:pr-6" key={movie.id}>
                    <Link
                      href={`/movie/${generateSlug(movie)}`}
                      className="group relative block !h-[140px] overflow-hidden rounded-sm lg:!h-[280px]">
                      <Image
                        className="absolute left-0 top-0 h-full w-full overflow-hidden object-cover transition-all duration-500 group-hover:scale-125 group-hover:opacity-50 group-hover:blur-sm"
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt={movie.title}
                        width={200}
                        height={400}
                      />

                      <div className="absolute bottom-0 left-0 h-full w-full scale-105 bg-gradient-to-b from-black/40 via-gray-900/20 to-black/50" />

                      <div className="absolute bottom-0 left-0 flex h-20 w-full flex-col items-start justify-center bg-black/50 px-2 py-3 md:h-24 lg:h-28">
                        <p className="text line-clamp-2">{movie.title}</p>
                      </div>
                    </Link>

                    {/* <div
                      className="absolute bottom-0 left-0 h-1 bg-secondary"
                      style={{ width: calculatePercentage(movie?.time, movie?.duration) }}
                    ></div> */}
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ContinueWatching;
