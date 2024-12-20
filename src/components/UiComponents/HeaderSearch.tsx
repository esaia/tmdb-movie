'use client';

import { generateSlug } from '@/lib/helpers';
import { searchData } from '@/lib/requests';
import { MovieType, SeriesType, paginationMovie, paginationSerie } from '@/types';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const HeaderSearch = ({ onClose }: { onClose?: () => void }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchQuery, setsearchQuery] = useState('');

  const [searchedMovies, setSearchedMovies] = useState<MovieType[] | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const searchMovieTarget = useDetectClickOutside({
    onTriggered: () => setIsInputFocused(false),
  });

  const onSearchInputChange = () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchData();
    }, 1000);

    const fetchData = async () => {
      try {
        const data = await searchData({ query: searchQuery });

        if (data.length) {
          setSearchedMovies(data);
        } else {
          setSearchedMovies([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  return (
    <div
      className={`customScrollbar relative z-40 w-full rounded-lg border-[1px] border-primary bg-primaryBlack p-3 transition-all duration-500 ease-out lg:w-[300px] ${isInputFocused ? 'border-secondary 2xl:w-[560px]' : '2xl:w-[500px]'}`}
      ref={searchMovieTarget}>
      <div className="flex items-center">
        <input
          type="text"
          name="search"
          placeholder="Search movie"
          className="w-full bg-transparent outline-none placeholder:text-xs"
          onFocus={() => setIsInputFocused(true)}
          onChange={e => {
            setsearchQuery(e.target.value);
            onSearchInputChange();
          }}
          value={searchQuery}
        />
        <div className="smtext flex items-center gap-2 rounded-full bg-secondary px-4 py-2" onClick={onClose}>
          <FaSearch className="hidden lg:inline" />
          <IoMdClose className="cursor-pointer text-xl lg:hidden" />
        </div>
      </div>

      {isInputFocused && (
        <>
          {!searchedMovies ? (
            <> </>
          ) : (
            <>
              <div
                className="md:max-w-10/12 absolute right-[50%] top-[calc(100%+4px)] flex h-fit max-h-[60vh] w-full min-w-[200px] max-w-max_width translate-x-[50%] flex-col items-start justify-start gap-3 overflow-auto rounded-lg border-[1px] border-secondary/50 bg-primaryBlack p-4 transition-all md:w-full"
                onClick={e => e.stopPropagation()}>
                {searchedMovies?.length === 0 ? (
                  <p>Nothing found</p>
                ) : (
                  searchedMovies.map((movie: MovieType) => {
                    return (
                      <Link
                        href={`/movie/${generateSlug(movie)}`}
                        onClick={() => {
                          if (onClose) onClose();
                          setIsInputFocused(false);
                          setsearchQuery('');
                        }}
                        className="animate-fadIn flex w-full cursor-pointer gap-3 rounded-sm transition-colors hover:bg-gray-900"
                        key={movie?.id}>
                        <Image
                          src={
                            movie?.backdrop_path
                              ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                              : '/images/poster.jpg'
                          }
                          width={400}
                          height={200}
                          alt={movie.title}
                          loading="lazy"
                          className="aspect-square h-16 w-28 flex-shrink-0 rounded-sm object-cover lg:h-10 lg:w-16 2xl:h-20 2xl:w-32"
                        />
                        <div className="mt-2">
                          <p className="line-clamp-2 text-xs xl:text-sm">{movie?.title}</p>

                          {movie?.release_date && (
                            <p className="text-xs xl:text-sm">{format(movie?.release_date, 'y')}</p>
                          )}
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HeaderSearch;
