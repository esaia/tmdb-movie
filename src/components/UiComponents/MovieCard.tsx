import { getCurrentDate } from '@/lib/requests';
import { MovieType, SeriesType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { IoPlay } from 'react-icons/io5';
import { SiImdb } from 'react-icons/si';
import { useGlobalStore } from '@/src/components/context/GlobaldataProvider';
import { differenceInDays } from 'date-fns';

const MovieCard = ({ movie }: { movie: MovieType | SeriesType }) => {
  const { currentDate } = useGlobalStore();

  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-sm pt-[140%]">
        <div className="group mb-4 h-fit overflow-hidden">
          <Image
            className="absolute left-0 top-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:opacity-50 group-hover:blur-sm"
            src={`${process.env.NEXT_PUBLIC_URL}/storage/${movie.poster_image}`}
            alt={movie.title_ka}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={720}
            height={1280}
            priority={true}
          />

          <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-black/20 via-gray-900/10 to-black/50" />
          <p className="smtext absolute left-0 top-0 m-2 rounded-md bg-gray-800/50 px-4 py-[1px] opacity-90">
            {movie.year}
          </p>
          <p className="smtext absolute right-0 top-0 m-2 rounded-md bg-gray-800/50 px-4 py-[1px] opacity-90">GEO</p>
          <div className="absolute bottom-0 left-0 m-2 flex items-center gap-2 py-[1px] opacity-0 transition-all delay-75 duration-500 group-hover:opacity-90">
            <SiImdb className="text-2xl text-yellow-400" />
            <span>{movie.imdb}</span>
          </div>
          {differenceInDays(currentDate, new Date(movie.created_at)) < 7 && (
            <button className="absolute bottom-0 right-0 m-2 rounded-md bg-secondary px-2 py-1 text-xs shadow-xl shadow-secondary/50 md:px-4">
              ახალი
            </button>
          )}
          <IoPlay className="absolute right-[50%] top-[50%] translate-x-[50%] translate-y-[-50%] scale-125 text-5xl text-gray-200 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 md:text-8xl" />
        </div>

        {/* {isHovering && (
          <div className="absolute w-[calc(100%+150px)] h-full bg-primaryBlack left-full top-0  z-10 animate-fadIn"></div>
        )} */}
      </div>
      <div className="px-2 py-2">
        <p className="line-clamp-2 text-xs lg:line-clamp-1 lg:text-sm">{movie.title_ka}</p>
        <p className="line-clamp-2 text-xs lg:line-clamp-1 lg:text-sm">{movie.title_en}</p>
      </div>
    </div>
  );
};

export default MovieCard;
