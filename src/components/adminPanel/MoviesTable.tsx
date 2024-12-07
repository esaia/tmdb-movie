'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

// COMPONENTS
import EditMovie from '@/src/components/adminPanel/EditMovie';
import Portal from '@/src/components/adminPanel/Portal';
import Button from '@/src/components/UiComponents/Button';
import Pagination from '@/src/components/UiComponents/Pagination';

import Switch from 'react-switch';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  deleteMovie,
  deleteMovieForever,
  editMovie,
  editMovieStatus,
  getArchivedMovies,
  getMovies,
  restoreMovie,
} from '@/lib/requests';
import toast, { Toaster } from 'react-hot-toast';
import UiInput from '@/src/components/UiComponents/UiInput';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MovieInput, MovieType, paginationMovie } from '@/types';

const MoviesTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isClient, setIsClient] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [movies, setMovies] = useState<paginationMovie>();
  const [currentMovie, setCurrentMovie] = useState<MovieType>();

  const [params, setParams] = useState({
    searchInput: searchParams.get('searchQuery')?.toString() || '',
    page: searchParams.get('page')?.toString() || '1',
    sort: searchParams.get('sort')?.toString() || '',
    dir: searchParams.get('dir')?.toString() || '',
  });

  const [error, setError] = useState(['']);
  const [loading, setLoading] = useState(false);

  const methods = useForm<MovieInput>();

  const { handleSubmit, setValue } = methods;

  const fetchMovies = async () => {
    let data;
    if (pathname === '/adminpanel/archived') {
      data = await getArchivedMovies(params.searchInput, searchParams.get('page') || '1', params.sort, params.dir);
    } else {
      data = await getMovies(params.searchInput, searchParams.get('page') || '1', params.sort, params.dir);
    }
    setMovies(data);
  };

  const setDefaultValues = (movie: MovieType) => {
    setValue('title_ka', movie?.title_ka || '');
    setValue('title_en', movie?.title_en || '');
    setValue('year', movie?.year || 0);
    setValue('description', movie?.description || '');
    setValue('director', movie?.director || '');
    setValue('tmdb_id', movie?.tmdb_id || 0);
    setValue('movie_url', movie?.movie_url || '');
    setValue('country', movie?.country || '');
    setValue('minutes', movie?.minutes || '');
    setValue('status', movie?.status || false);
    setValue('imdb', movie.imdb || '');
    setValue('genre_ids', movie?.genres.map(item => item.id) || []);
    setValue('taxonomy_ids', movie?.taxonomy.map(item => item.id) || []);
    setValue('poster_image', `${process.env.NEXT_PUBLIC_URL}/storage/${movie.poster_image}` || '');
    setValue('cover_image', `${process.env.NEXT_PUBLIC_URL}/storage/${movie.cover_image}` || '');
  };

  const onSubmitEdit: SubmitHandler<MovieInput> = async movie => {
    if (loading || !currentMovie || !movie) return;

    const formData = new FormData();
    setError([]);
    setLoading(true);

    Object.entries(movie).map(item => {
      if (['poster_image', 'cover_image'].includes(item[0])) {
        if (typeof item[1][0] !== 'object') return;
        formData.append(item[0], item[1][0]);
      } else if (item[0] === 'genre_ids') {
        formData.append(item[0], JSON.stringify(item[1].map((item: string) => +item)));
      } else if (item[0] === 'taxonomy_ids') {
        formData.append(item[0], JSON.stringify(item[1].map((item: string) => +item)));
      } else if (item[0] === 'status') {
        formData.append('status', item[1] === true || item[1] === 'true' ? '1' : '0');
      } else {
        formData.append(item[0], item[1]);
      }
    });

    try {
      await editMovie(formData, currentMovie.id);
      // setOpenModal(false);

      toast.success('ფილმის ცვლილება', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      fetchMovies();
      setOpenModal(false);
    } catch (error: any) {
      // console.log('error -> ', error);

      toast.error('ფილმის ცვლილება არ განხორციელდა', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });

      if (
        error &&
        error?.response?.data?.data &&
        // @ts-ignore
        typeof Object.values(error?.response?.data?.data)?.[0]?.[0] === 'string'
      ) {
        setError((Object.values(error?.response?.data.data) as string[]).map(item => item[0]));
      } else {
        setError(['something went wrong']);
      }
    }

    setLoading(false);
  };

  const updateMovieStatus = async (status: boolean, movie: MovieType) => {
    try {
      await editMovieStatus(status, movie.id);

      toast.success('ფილმის სტატუსი შეიცვალა', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovieById = async () => {
    try {
      if (currentMovie?.id) await deleteMovie(currentMovie?.id);

      toast.success('ფილმი წაიშალა', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      setOpenModal(false);
      fetchMovies();
    } catch (error) {
      console.log(error);
      toast.error('ფილმი წაშლა ვერ მოხერხდა');
    }
  };

  const deleteMovieFore = async (movie: MovieType) => {
    try {
      if (movie?.id) await deleteMovieForever(movie?.id);

      toast.success('ფილმი წაიშალა სამუდამოდ', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      setOpenModal(false);
      fetchMovies();
    } catch (error) {
      console.log(error);
      toast.error('ფილმი წაშლა ვერ მოხერხდა');
    }
  };

  const restore = async (movie: MovieType) => {
    try {
      if (movie?.id) await restoreMovie(movie?.id);

      toast.success('ფილმი აღდგა', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      setOpenModal(false);
      fetchMovies();
    } catch (error) {
      console.log(error);
      toast.error('ფილმი აღდგენა ვერ მოხერხდა');
    }
  };

  // useEffect(() => {
  //   setIsClient(true);
  //   router.push(pathname + `?page=${params.page}&sort=${params.sort}&dir=${params.dir}`);
  //   fetchMovies();
  // }, [params.dir, params.sort]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [searchParams.get('page')]);

  const bottomButtons = (
    <div className="flex w-fit gap-8">
      <div onDoubleClick={deleteMovieById}>
        <Button title="წაშლა" type={3} handleType="button" />
      </div>
      <Button title="შენახვა" type={2} handleType="submit" />
    </div>
  );

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="relative w-full overflow-x-auto">
        <div className="flex w-full justify-between py-4">
          <div className="flex items-center gap-2">
            {[searchParams.get('sort'), searchParams.get('dir')].map((item, i) => {
              return (
                <div key={i}>
                  {item && (
                    <p onClick={() => router.push(pathname)} className="cursor-pointer rounded-md bg-primary px-4 py-2">
                      {item}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-full max-w-80">
            <form action="">
              <UiInput
                name={'searchQuery'}
                value={params.searchInput || ''}
                change={e => {
                  setParams({ ...params, searchInput: e.target.value });
                }}
                label={'მოძებნე ფილმი'}
                placeholder={'...'}
              />
            </form>
          </div>
        </div>
        <div className="rounded-md border-2 border-gray-700">
          <table className="w-full text-left text-sm text-gray-400 rtl:text-right">
            <thead className="bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-3">ID:</th>
                <th
                  scope="col"
                  className="cursor-pointer px-6 py-3"
                  onClick={() => {
                    // window.history.replaceState(null, '', pathname);

                    setParams({ ...params, sort: 'title_ka', dir: params.dir === 'asc' ? 'desc' : 'asc' });
                  }}
                >
                  ფილმის სახელი
                </th>
                <th scope="col" className="px-6 py-3">
                  აღწერა
                </th>
                <th scope="col" className="px-6 py-3">
                  პოსტერი
                </th>
                <th
                  scope="col"
                  className="w-20 cursor-pointer px-6 py-3"
                  onClick={() => setParams({ ...params, sort: 'status', dir: params.dir === 'asc' ? 'desc' : 'asc' })}
                >
                  კონფიგურაცია
                </th>
              </tr>
            </thead>
            <tbody>
              {movies?.data?.map(movie => {
                return (
                  <tr key={movie.id} className="border-b border-gray-700 bg-gray-800">
                    <th className="px-3">{movie.id}</th>
                    <th scope="row" className="whitespace-nowrap border-r border-gray-700 px-6 font-medium text-white">
                      <Link href={`/movie/${movie.id}`} className="text-lg">
                        {movie.title_ka}
                      </Link>
                      <div className="flex gap-2 text-xs text-gray-400">
                        {movie.genres.map(genre => genre.genre).join(', ')}
                      </div>
                      <div className="flex gap-2 text-xs text-gray-400">
                        ({movie.taxonomy.map(taxonomy => taxonomy.name).join(', ')})
                      </div>
                      <p className="text-gray-200">{movie.year}</p>
                    </th>

                    <th scope="row" className="whitespace-nowrap border-r border-gray-700 px-6 font-medium text-white">
                      <p className="!line-clamp-3 flex min-w-32 max-w-80 gap-2 text-wrap text-xs text-gray-300">
                        {movie.description}
                      </p>
                    </th>

                    <td className="border-r border-gray-700 px-6 py-4">
                      <Image
                        width={1080}
                        height={1920}
                        src={`${process.env.NEXT_PUBLIC_URL}/storage/${movie.poster_image}`}
                        alt={movie.title_en}
                        className="h-20 w-16 cursor-pointer rounded-md object-cover transition-all hover:scale-[2]"
                      />
                    </td>

                    <td className="px-6 py-4">
                      {pathname === '/adminpanel/archived' ? (
                        <div className="">
                          <div
                            className="smtext mb-4 cursor-pointer uppercase hover:underline"
                            onDoubleClick={() => restore(movie)}
                          >
                            აღდგენა
                          </div>
                          <div
                            className="smtext cursor-pointer uppercase text-secondary hover:underline"
                            onDoubleClick={() => deleteMovieFore(movie)}
                          >
                            სამუდამოდ წაშლა
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Switch
                            checked={movie.status}
                            onChange={e => updateMovieStatus(e, movie)}
                            onColor="#86d3ff"
                            onHandleColor="#173952"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch"
                            id="material-switch"
                          />

                          <div
                            className="cursor-pointer px-6 uppercase hover:underline"
                            onClick={async () => {
                              setCurrentMovie(movie);
                              setDefaultValues(movie);
                              setOpenModal(true);
                            }}
                          >
                            Edit
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex w-full justify-end py-10">{movies && <Pagination total={movies.last_page} />}</div>
      </div>

      {isClient &&
        openModal &&
        createPortal(
          <Portal closeModal={() => setOpenModal(false)}>
            <>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitEdit)}>
                  <EditMovie bottomButtons={bottomButtons} />
                </form>
                <div className="text-red-500">
                  {error?.map(err => {
                    return <div key={err}>{err}</div>;
                  })}
                </div>
              </FormProvider>
            </>
          </Portal>,
          document.querySelector('.portal') as HTMLDivElement,
        )}
    </>
  );
};

export default MoviesTable;
