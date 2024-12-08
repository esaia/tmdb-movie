'use client';

import { getMovies } from '@/lib/requests';
import Button from '@/src/components/UiComponents/Button';
import Loading from '@/src/components/UiComponents/Loading';
import MovieCard from '@/src/components/UiComponents/MovieCard';
import { MovieType } from '@/types';
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
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const allMovies = await getMovies('/movie/upcoming', { params: { page } });
      setMovies([...movies, ...allMovies]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div className="mainContainer relative m-auto min-h-svh max-w-max_width pt-24 lg:pt-40">
      {loading && page === 1 ? (
        <div className="flex h-fit items-start justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
            {movies?.map(movie => {
              return (
                <div key={movie?.id}>
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-center py-10">
            <Button title="Load More" type={4} onClick={() => setPage(page => page + 1)} />
          </div>
        </>
      )}
    </div>
  );
};
