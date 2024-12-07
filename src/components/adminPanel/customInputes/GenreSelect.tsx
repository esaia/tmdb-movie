'use client';

import { getAllGenres } from '@/lib/requests';
import { genreType } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useFormContext, useWatch } from 'react-hook-form';

const GenreSelect = () => {
  const [isActive, setisActive] = useState(false);
  const [genres, setGenres] = useState<genreType[]>([]);
  const [searchGenre, setSearchGenre] = useState('');

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const genre_ids = useWatch({ name: 'genre_ids' });
  const genreIds = useWatch({
    control,
    name: 'genre_ids',
  });

  const genreSelectTarget = useDetectClickOutside({
    onTriggered: () => setisActive(false),
  });

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getAllGenres();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  return (
    <div
      className={`relative cursor-pointer transition-all ${isActive ? 'flex-[3]' : 'flex-[1]'}`}
      ref={genreSelectTarget}
    >
      <div onClick={() => setisActive(true)} className="flex h-full flex-col justify-between">
        <p className="text mb-2 block text-sm font-medium text-white">ჟანრი</p>
        <input
          placeholder={genreIds
            ?.map((chosenId: number) => genres?.find(genre => genre?.id === +chosenId)?.genre)
            ?.join(', ')}
          className="text flex w-full items-center rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 outline-none"
          onChange={e => setSearchGenre(e.target.value)}
        />
        <p className="smtext mt-[5px] h-2 text-red-500">{errors?.['genre_ids']?.message as string}</p>
      </div>

      {isActive && (
        <div className="absolute left-[50%] top-20 z-40 h-fit max-h-[400px] w-full translate-x-[-50%] overflow-auto rounded-md bg-primaryBlack p-5">
          {genres
            .filter(genre => genre?.genre.includes(searchGenre))
            .map(genre => {
              return (
                <label
                  htmlFor={genre?.id.toString()}
                  key={genre?.id}
                  className="mb-4 flex cursor-pointer items-center gap-3 bg-primary px-2 py-4"
                >
                  <input
                    type="checkbox"
                    id={genre?.id.toString()}
                    value={genre?.id}
                    {...register('genre_ids')}
                    defaultChecked={genre_ids.includes(genre?.id)}
                  />
                  <span className="cursor-pointer">{genre?.genre}</span>
                </label>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default GenreSelect;
