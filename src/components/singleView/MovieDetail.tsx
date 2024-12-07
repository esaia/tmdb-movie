import { formatDuration } from '@/lib/helpers';
import { MovieType, SeriesType, genreType } from '@/types';
import Image from 'next/image';
import React from 'react';
import { SiImdb } from 'react-icons/si';

const MovieDetail = ({ movie, genres }: { movie: MovieType | SeriesType; genres: genreType[] }) => {
  return (
    <div
      className="relative m-auto w-full bg-cover bg-center bg-no-repeat py-10 transition-opacity duration-700 lg:py-16"
      style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/storage/${movie.cover_image})` }}>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/80"></div>
      {/* <div
        className="absolute top-0 left-0 h-full w-full md:bg-fixed transition-opacity  duration-700 bg-no-repeat bg-cover bg-center "
        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/storage/${movie.cover_image})` }}
      /> */}

      <div className="mainContainer z-20 m-auto flex max-w-max_width flex-col gap-10 lg:flex-row">
        <Image
          src={`${process.env.NEXT_PUBLIC_URL}/storage/${movie.poster_image}`}
          width={1080}
          height={1920}
          alt={movie.title_ka}
          className="z-20 aspect-2/3 w-40 max-w-60 cursor-pointer rounded-sm object-cover transition-all duration-500 hover:scale-110 lg:hidden lg:w-64"
        />

        <div className="z-20 h-full w-full flex-1">
          <h1 className="title mb-1 font-semibold uppercase">
            {movie.title_ka} ({movie?.year})
          </h1>
          <h1 className="title uppercase">{movie.title_en}</h1>
          <div className="mt-4 h-[1px] w-full bg-secondary/30" />

          <div className="flex flex-col gap-1 py-4">
            <div className="flex items-center justify-between">
              <MovieInfo
                detailKey="ჟანრი"
                value={genres
                  .filter(genre => movie.genres.map(movieGenre => movieGenre.id).includes(genre.id))
                  .map(genre => genre?.genre)}
              />

              <div className="smtext flex items-center justify-center gap-2">
                <SiImdb className="text-2xl text-yellow-400" />
                <span>{movie.imdb}</span>
              </div>
            </div>
            <MovieInfo detailKey="გამოშვების წელი" value={movie.year.toString()} />
            <MovieInfo detailKey="ხანგრძლივობა" value={formatDuration(movie.minutes)} />
            <MovieInfo detailKey="ქვეყანა" value={movie.country} />
            <MovieInfo detailKey="რეჟისორი" value={movie.director} />
          </div>

          <div className="text max-w-[900px]">
            <p className="text-sm uppercase">ფილმის აღწერა:</p>
            <p className="smtext">{movie.description}</p>
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
