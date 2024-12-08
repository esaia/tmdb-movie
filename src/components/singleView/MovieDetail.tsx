import { MovieType } from '@/types';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import { SiImdb } from 'react-icons/si';

const MovieDetail = ({ movie }: { movie: MovieType }) => {
  return (
    <div
      className="relative m-auto w-full bg-cover bg-center bg-no-repeat py-10 transition-opacity duration-700 lg:py-16"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/80"></div>

      <div className="mainContainer z-20 m-auto flex max-w-max_width flex-col gap-10 lg:flex-row">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          width={300}
          height={450}
          alt={movie.title}
          className="z-20 aspect-2/3 w-40 max-w-60 cursor-pointer rounded-lg object-cover transition-all duration-500 hover:scale-110 lg:hidden lg:w-64"
        />

        <div className="z-20 h-full w-full flex-1">
          <h1 className="title mb-1 font-semibold uppercase">
            {movie.title} ({format(movie?.release_date, 'y')})
          </h1>
          <div className="mt-4 h-[1px] w-full bg-white/40" />

          <div className="flex flex-col gap-1 py-4">
            <div className="flex items-center justify-between">
              {movie?.genres && <MovieInfo detailKey="Genre" value={movie?.genres.map(genre => genre?.name)} />}

              <div className="smtext flex items-center justify-center gap-2">
                <SiImdb className="text-2xl text-yellow-400" />
                {/* <span>{movie.imdb}</span> */}
              </div>
            </div>
            <MovieInfo detailKey="Release Year" value={format(movie?.release_date, 'y')} />
            {movie?.revenue ? <MovieInfo detailKey="revenue" value={movie.revenue?.toString()} /> : ''}
            {movie?.budget ? <MovieInfo detailKey="Budget" value={movie.budget?.toString()} /> : ''}
            {movie?.popularity ? <MovieInfo detailKey="popularity" value={movie?.popularity?.toString()} /> : ''}

            {/* <MovieInfo detailKey="Budget" value={movie?.budget} /> */}
            {/* <MovieInfo detailKey="რეჟისორი" value={movie.director} /> */}
          </div>

          <div className="text max-w-[900px]">
            <p className="text-sm uppercase">Description:</p>
            <p className="smtext">{movie?.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

const MovieInfo = ({ detailKey, value }: { detailKey: string; value: string | string[] }) => {
  return (
    <div className="text flex gap-2 py-[1px]">
      <p className="text-sm uppercase">{detailKey}: </p>

      {Array.isArray(value) ? (
        <div>
          <p className="smtext opacity-80">
            {value.map((item, i, arr) => {
              return i < arr.length - 1 ? item + ' • ' : item;
            })}
          </p>
        </div>
      ) : (
        <p className="smtext opacity-80">{value}</p>
      )}
    </div>
  );
};
