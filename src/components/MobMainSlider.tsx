'use client';

import React from 'react';
import Image from 'next/image';
import Button from './UiComponents/Button';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { MovieType } from '@/types';
import { format } from 'date-fns';

const MobMainSlider = ({ movies }: { movies: MovieType[] }) => {
  return (
    <div className="m-auto h-[350px] max-w-max_width bg-black">
      <Swiper
        slidesPerView={1}
        loop={true}
        spaceBetween={20}
        pagination={{ clickable: true }}
        // autoplay={{
        //   delay: 4000,
        // }}
        modules={[Pagination]}
        className="h-full">
        {movies.map(movie => {
          return (
            <SwiperSlide className="relative h-full w-full" key={movie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                width={720}
                height={1280}
                alt={movie.title}
                className="absolute left-0 top-0 h-full w-full object-cover"
              />
              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-neutral-900/50 via-slate-800/50 to-black/90"></div>
              <div className="mainContainer absolute bottom-10 flex w-full items-center justify-between gap-5">
                <div className="flex-1">
                  <h2 className="line-clamp-2 font-bold">{movie.title}</h2>
                  <h2 className="smtext line-clamp-1 text-gray-300">
                    {movie.title} ({format(movie.release_date, 'y')})
                  </h2>
                </div>
                <Link href={`movie/${movie.id}`}>
                  <div className="w-fit">
                    <Button title="Watch now" />
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MobMainSlider;
