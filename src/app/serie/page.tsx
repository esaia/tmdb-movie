'use client';

import { generateSlug } from '@/lib/helpers';
import { getAllSeries } from '@/lib/requests';
import Loading from '@/src/components/UiComponents/Loading';
import MovieCard from '@/src/components/UiComponents/MovieCard';
import Pagination from '@/src/components/UiComponents/Pagination';
import { paginationMovie } from '@/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

const Page = () => {
  return (
    <Suspense>
      <MoviesList />
    </Suspense>
  );
};

export default Page;

const MoviesList = () => {
  const searchParams = useSearchParams();
  const [series, setseries] = useState<paginationMovie>();
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const series = await getAllSeries({ page: searchParams.get('page')?.toString() });
      setseries(series);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [searchParams.get('page')]);

  return (
    <div className="mainContainer relative m-auto min-h-screen max-w-max_width pt-32 lg:pt-40">
      {loading ? (
        <Loading />
      ) : (
        <>
          {series?.data.length !== 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
              {series?.data?.map((serie, i) => {
                return (
                  <div key={serie.id} className="fadeIn scale-0" style={{ animationDelay: `${i * 0.04}s` }}>
                    <Link href={`/serie/${generateSlug(serie)}`}>
                      <MovieCard movie={serie} />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full">
              <h3 className="title text-center">სერიალები მალე დაემატება</h3>
            </div>
          )}

          <div className="flex justify-center py-10">
            {series?.data.length !== 0 && series?.total && series?.total > series?.per_page && (
              <Pagination total={series?.last_page} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
