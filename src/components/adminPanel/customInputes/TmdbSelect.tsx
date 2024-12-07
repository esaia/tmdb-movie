'use client';

import { getTmdbMovieId } from '@/lib/requests';
import { TmdbType } from '@/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useFormContext, useWatch } from 'react-hook-form';

const TmdbSelect = () => {
  const [movies, setMovies] = useState<TmdbType[]>([]);
  const [searchMovieInput, setSearchMovieInput] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  useEffect(() => {
    register('tmdb_id', { required: { value: true, message: 'ეს ველი სავალდებულოა' } });
  }, []);

  const tmdb_id = useWatch({
    control,
    name: 'tmdb_id',
  });

  const tmdbSelectTarget = useDetectClickOutside({
    onTriggered: () => setIsInputActive(false),
  });

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchMovieInput(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      if (!value) return;

      try {
        const data = await getTmdbMovieId(value);
        setMovies(data?.results);
      } catch (error) {
        console.error('error', error);
      }
    }, 800);
  };

  const onMovieClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, perMovie: TmdbType) => {
    e.stopPropagation();
    // setMovie({ ...movie, tmdb_id: perMovie.id });
    setValue('tmdb_id', perMovie.id);
    clearErrors('tmdb_id');

    setIsInputActive(false);
  };

  return (
    <div className={`relative transition-all ${isInputActive ? 'flex-[4]' : 'flex-[1]'} `} ref={tmdbSelectTarget}>
      <div className="flex h-full flex-col justify-between">
        <p className="text mb-2 block text-sm font-medium text-white">tmdb ID</p>
        <input
          onChange={e => onInputChange(e)}
          name={'tmdb_id'}
          placeholder={'39952'}
          onFocus={() => setIsInputActive(true)}
          className="text flex w-full items-center rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 outline-none"
        />
        <p className="smtext mt-[5px] text-red-500">{errors?.['tmdb_id']?.message as string}</p>

        <p className="text-gray-400">movie ID: {tmdb_id}</p>
        <p className="cursor-pointer text-gray-400" onClick={() => setValue('tmdb_id', null)}>
          clear
        </p>
      </div>

      {isInputActive && (
        <div className="absolute left-[50%] top-[70px] h-fit max-h-[400px] w-full translate-x-[-50%] overflow-auto rounded-md bg-primaryBlack p-5">
          {movies.length > 0 ? (
            movies.map((perMovie, i) => {
              return (
                <div className="mb-4 cursor-pointer bg-primary" key={i}>
                  <div className="flex w-full items-center justify-between" onClick={e => onMovieClick(e, perMovie)}>
                    <div className="flex-1">
                      <p className="px-6">{perMovie?.title}</p>
                      <p className="px-6 text-sm text-gray-600">{perMovie?.id}</p>
                    </div>
                    {perMovie?.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${perMovie?.poster_path}`}
                        width={1080}
                        height={1920}
                        alt="poster image"
                        className="h-24 w-16 object-cover"
                      />
                    ) : (
                      <div className="h-24"></div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <>ფილმი არ მოიძებნა</>
          )}
        </div>
      )}
    </div>
  );
};

export default TmdbSelect;
