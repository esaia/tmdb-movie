'use client';
import React, { ReactNode } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MovieCard from '@/src/components/UiComponents/MovieCard';
import { MovieType, SeriesType } from '@/types';
import Link from 'next/link';
import { generateSlug } from '@/lib/helpers';

const CategorySlider = ({
  movies,
  categoryTitle,
  icon,
}: {
  movies: MovieType[];
  categoryTitle: string;
  icon?: ReactNode;
}) => {
  return (
    <>
      {movies.length ? (
        <div className="mainContainer wrapper m-auto flex max-w-max_width flex-col gap-5 py-5 transition-all duration-500 lg:py-10">
          <div className="flex items-center gap-3">
            <div className="title rounded-full bg-secondary p-2 lg:p-3">{icon}</div>
            <h3 className="title font-bold uppercase">{categoryTitle}</h3>
          </div>

          <Swiper
            slidesPerView={'auto'}
            speed={600}
            className="!w-full !overflow-visible"
            //  className="!h-fit !w-full !pl-4 md:!pl-10 lg:!pl-20 xl:!pl-28 "
          >
            {movies.map(movie => {
              return (
                <SwiperSlide
                  key={movie.id}
                  className="!w-[160px] cursor-pointer pr-2 sm:!w-[180px] lg:!w-[240px] lg:pr-3">
                  {/* <Link href={`${movie?.serie_urls ? '/serie' : '/movie'}/${generateSlug(movie)}`}> */}
                  <MovieCard movie={movie} />
                  {/* </Link> */}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CategorySlider;
