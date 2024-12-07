'use client';

import { generateSlug } from '@/lib/helpers';
import { getMovies } from '@/lib/requests';
import Button from '@/src/components/UiComponents/Button';
import Loading from '@/src/components/UiComponents/Loading';
import MovieCard from '@/src/components/UiComponents/MovieCard';
import Pagination from '@/src/components/UiComponents/Pagination';
import { MovieType, paginationMovie } from '@/types';
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
  const [movies, setMovies] = useState<MovieType[]>([]);
  // movies?.data.filter((movie) => movie.taxonomy.some(taxonomy => taxonomy.slug === "coming_soon") )
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const generatePerPage = () => {
    if (window.innerWidth < 768) {
      return 14;
    } else {
      return 15;
    }
  };

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
      {loading ? (
        <div className="flex h-fit items-start justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
            {movies?.map(movie => {
              return (
                <div key={movie?.id}>
                  <Link href={`/movie/${generateSlug(movie)}`}>
                    <MovieCard movie={movie} />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center py-10">
            {/* {movies?.data.length !== 0 && movies?.total && movies?.total > movies?.per_page && (
              <Pagination total={movies?.last_page} />
            )} */}

            <button
              className="rounded-full border-2 border-white px-4 py-2 font-semibold text-white transition-all hover:bg-white hover:text-secondary"
              onClick={() => setPage(page => page + 1)}>
              Load More
            </button>
          </div>
        </>
      )}
    </div>
  );
};
