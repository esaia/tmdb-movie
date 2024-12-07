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
  deleteSerie,
  editMovie,
  editMovieStatus,
  editSerie,
  editSeriesStatus,
  getArchivedMovies,
  getMovies,
  getSeries,
  restoreMovie,
} from '@/lib/requests';
import toast, { Toaster } from 'react-hot-toast';
import UiInput from '@/src/components/UiComponents/UiInput';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MovieInput, MovieType, paginationMovie, paginationSerie, SeriesInput, SeriesType, serieUrl } from '@/types';
import EditSeries from './EditSerie';
import { json } from 'stream/consumers';

const SeriesTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isClient, setIsClient] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [series, setSeries] = useState<paginationSerie>();
  const [currentSerie, setCurrentSerie] = useState<SeriesType>();

  const [params, setParams] = useState({
    searchInput: searchParams.get('searchQuery')?.toString() || '',
    page: searchParams.get('page')?.toString() || '1',
    sort: searchParams.get('sort')?.toString() || '',
    dir: searchParams.get('dir')?.toString() || '',
  });

  const [error, setError] = useState(['']);
  const [loading, setLoading] = useState(false);

  const methods = useForm<SeriesInput>();

  const { handleSubmit, setValue, reset } = methods;

  const fetchSeries = async () => {
    const data = await getSeries(params.searchInput, searchParams.get('page') || '1', params.sort, params.dir);
    setSeries(data);
  };

  const setDefaultValues = (serie: SeriesType) => {
    setValue('title_ka', serie?.title_ka || '');
    setValue('title_en', serie?.title_en || '');
    setValue('year', serie?.year || 0);
    setValue('description', serie?.description || '');
    setValue('director', serie?.director || '');
    setValue('tmdb_id', serie?.tmdb_id || 0);
    setValue('country', serie?.country || '');
    setValue('minutes', serie?.minutes || '');
    setValue('status', serie?.status || false);
    setValue('imdb', serie.imdb || '');
    setValue('genre_ids', serie?.genres.map(item => item.id) || []);
    setValue('taxonomy_ids', serie?.taxonomy.map(item => item.id) || []);
    setValue('poster_image', `${process.env.NEXT_PUBLIC_URL}/storage/${serie.poster_image}` || '');
    setValue('cover_image', `${process.env.NEXT_PUBLIC_URL}/storage/${serie.cover_image}` || '');
    setValue('serie_urls', serie.serie_urls);
  };
  const onSubmitEdit: SubmitHandler<SeriesInput> = async serie => {
    if (loading || !currentSerie || !serie) return;

    const formData = new FormData();
    setError([]);
    setLoading(true);

    Object.keys(serie).forEach((key: string) => {
      const value = serie[key as keyof SeriesInput];

      switch (key) {
        case 'poster_image':
        case 'cover_image':
          // @ts-ignore
          if (typeof value[0] !== 'object') return;
          // @ts-ignore
          formData.append(key, value[0]);
          break;
        case 'genre_ids':
        case 'taxonomy_ids':
          formData.append(key, JSON.stringify(value));
          break;
        case 'serie_urls':
          (value as serieUrl[]).forEach((series, index) => {
            for (let key in series) {
              // @ts-ignore
              formData.append(`serie_urls[${index}][${key}]`, series[key]);
            }
          });
          //   formData.append(key, JSON.stringify(value));
          break;
        case 'status':
          formData.append('status', value === true || value === 'true' ? '1' : '0');
          break;
        default:
          formData.append(key, value as string);
          break;
      }
    });

    try {
      await editSerie(formData, currentSerie.id);
      // setOpenModal(false);

      toast.success('სერიალის ცვლილება', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      fetchSeries();
      setOpenModal(false);
    } catch (error: any) {
      // console.log('error -> ', error);

      toast.error('სერიალის ცვლილება არ განხორციელდა', {
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

  const updateMovieStatus = async (status: boolean, movie: SeriesType) => {
    try {
      await editSeriesStatus(status, movie.id);

      toast.success('სერიალის სტატუსი შეიცვალა', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      fetchSeries();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovieById = async () => {
    try {
      if (currentSerie?.id) await deleteSerie(currentSerie?.id);

      toast.success('სერიალი წაიშალა', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      setOpenModal(false);
      fetchSeries();
    } catch (error) {
      console.log(error);
      toast.error('სერიალი წაშლა ვერ მოხერხდა');
    }
  };

  // useEffect(() => {
  //   setIsClient(true);
  //   router.push(pathname + `?page=${params.page}&sort=${params.sort}&dir=${params.dir}`);
  //   fetchSeries();
  // }, [params.dir, params.sort]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetchSeries();
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
                  სერიალის სახელი
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
              {series?.data?.map(serie => {
                return (
                  <tr key={serie.id} className="border-b border-gray-700 bg-gray-800">
                    <th className="px-3">{serie.id}</th>

                    <th scope="row" className="whitespace-nowrap border-r border-gray-700 px-6 font-medium text-white">
                      <Link href={`/movie/${serie.id}`} className="text-lg">
                        {serie.title_ka}
                      </Link>
                      <div className="flex gap-2 text-xs text-gray-400">
                        {serie.genres.map(genre => genre.genre).join(', ')}
                      </div>
                      <div className="flex gap-2 text-xs text-gray-400">
                        ({serie.taxonomy.map(taxonomy => taxonomy.name).join(', ')})
                      </div>
                      <p className="text-gray-200">{serie.year}</p>
                    </th>

                    <th scope="row" className="whitespace-nowrap border-r border-gray-700 px-6 font-medium text-white">
                      <p className="!line-clamp-3 flex min-w-32 max-w-80 gap-2 text-wrap text-xs text-gray-300">
                        {serie.description}
                      </p>
                    </th>

                    <td className="border-r border-gray-700 px-6 py-4">
                      <Image
                        width={1080}
                        height={1920}
                        src={`${process.env.NEXT_PUBLIC_URL}/storage/${serie.poster_image}`}
                        alt={serie.title_en}
                        className="h-20 w-16 cursor-pointer rounded-md object-cover transition-all hover:scale-[2]"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <Switch
                          checked={serie.status}
                          onChange={e => updateMovieStatus(e, serie)}
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
                            setCurrentSerie(serie);
                            setDefaultValues(serie);
                            setOpenModal(true);
                          }}
                        >
                          Edit
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex w-full justify-end py-10">{series && <Pagination total={series.last_page} />}</div>
      </div>

      {isClient &&
        openModal &&
        createPortal(
          <Portal closeModal={() => setOpenModal(false)}>
            <>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitEdit)}>
                  <EditSeries bottomButtons={bottomButtons} />
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

export default SeriesTable;
